from flask import Flask, request, jsonify
from flask_cors import CORS

import cv2
import numpy as np
import base64
import random
import mediapipe as mp
import time

from health_assistant import chat_with_health_assistant
from rppg_core import MultiROIFusionEngineV2
from rppg_vitals import VitalsEngine

app = Flask(__name__)
CORS(app)


mp_face_mesh = mp.solutions.face_mesh

face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)


fusion_engine = MultiROIFusionEngineV2()
vitals_engine = VitalsEngine()

last_bpm      = 72.0
last_vitals   = {}


@app.route('/process-frame', methods=['POST'])
def process_frame():

    global last_bpm, last_vitals

    try:

        data       = request.json
        image_data = data["image"].split(",")[1]
        img_bytes  = base64.b64decode(image_data)
        np_arr     = np.frombuffer(img_bytes, np.uint8)
        frame      = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({"success": False, "error": "Failed to decode image"}), 400


        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results   = face_mesh.process(rgb_frame)
        face_box  = None

        if results.multi_face_landmarks:

            face_landmarks = results.multi_face_landmarks[0]
            h, w, _        = frame.shape

            xs = [int(lm.x * w) for lm in face_landmarks.landmark]
            ys = [int(lm.y * h) for lm in face_landmarks.landmark]

            face_box = {
                "x": max(min(xs), 0),
                "y": max(min(ys), 0),
                "w": min(max(xs), w) - max(min(xs), 0),
                "h": min(max(ys), h) - max(min(ys), 0),
            }

            frame_result = fusion_engine.update(frame, face_landmarks, h, w)

            if frame_result is not None and frame_result.fused_bpm > 0:
                bpm = float(frame_result.fused_bpm)

                if 30 < bpm < 180:
                    last_bpm = bpm

                chrom = frame_result.chrom_signal
                sqi   = float(frame_result.fused_sqi)

                if len(chrom) >= 30:
                    vitals = vitals_engine.compute(chrom, last_bpm, sqi)

                    last_vitals = {
                        "resp_rate":    round(float(vitals.resp_rate),   1),
                        "hrv_sdnn":     round(float(vitals.hrv_sdnn),    1),
                        "stress_index": round(float(vitals.stress_index),1),
                        "arrhythmia":   bool(vitals.arrhythmia_flag),
                    }

                if len(chrom) > 0:
                    snippet = chrom[-80:] if len(chrom) >= 80 else chrom
                    std     = float(np.std(snippet))
                    if std > 1e-8:
                        snippet = (snippet - np.mean(snippet)) / std
                    else:
                        snippet = np.zeros_like(snippet)
                    signal_points = [round(float(v), 4) for v in snippet]
                else:
                    signal_points = []

            else:
                signal_points = []

        else:
            signal_points = []

        return jsonify({
            "success":      True,
            "bpm":          round(last_bpm, 1),
            "face":         face_box,
            "signal":       signal_points,          # real rPPG waveform
            "resp_rate":    last_vitals.get("resp_rate",    0.0),
            "hrv_sdnn":     last_vitals.get("hrv_sdnn",     0.0),
            "stress_index": last_vitals.get("stress_index", 0.0),
            "arrhythmia":   last_vitals.get("arrhythmia",   False),
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

conversation_history = []

recommendations = {
    "good": [
        "Hari ini cocok untuk jalan santai 15 menit.",
        "Tubuh Anda menunjukkan pemulihan yang baik hari ini.",
        "Coba lakukan peregangan ringan setelah duduk lama.",
        "Aktivitas ringan seperti berjalan kaki sangat disarankan hari ini.",
        "Detak jantung Anda cukup stabil untuk mobilitas ringan."
    ],
    "warning": [
        "Kurangi aktivitas berat hari ini dan fokus pada pemulihan.",
        "Disarankan memperbanyak waktu istirahat.",
        "Hindari olahraga intens untuk sementara.",
        "Cobalah tidur lebih awal malam ini.",
        "Perhatikan hidrasi dan jangan terlalu lelah."
    ],
    "danger": [
        "Tubuh Anda membutuhkan lebih banyak istirahat hari ini.",
        "Hindari aktivitas fisik berat sementara waktu.",
        "Pantau kondisi jantung Anda secara berkala.",
        "Kurangi aktivitas berlebihan hari ini.",
        "Fokus pada pemulihan dan relaksasi tubuh."
    ]
}

@app.route("/chat", methods=["POST"])
def chat():

    global conversation_history

    data         = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message kosong"}), 400

    try:
        response, conversation_history = chat_with_health_assistant(
            user_message, conversation_history
        )
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/daily-recommendation", methods=["GET"])
def daily_recommendation():

    status         = random.choice(["good", "warning", "danger"])
    recommendation = random.choice(recommendations[status])

    return jsonify({"status": status, "recommendation": recommendation})

if __name__ == "__main__":
    app.run(debug=True)
