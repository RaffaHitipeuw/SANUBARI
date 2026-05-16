from flask import Flask, request, jsonify
from flask_cors import CORS
import random

from health_assistant import chat_with_health_assistant

app = Flask(__name__)
CORS(app)

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

    data = request.json
    user_message = data.get("message")

    if not user_message:
        return jsonify({
            "error": "Message kosong"
        }), 400

    try:

        response, conversation_history = chat_with_health_assistant(
            user_message,
            conversation_history
        )

        return jsonify({
            "response": response
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@app.route("/daily-recommendation", methods=["GET"])
def daily_recommendation():
    status = random.choice(["good", "warning", "danger"])

    recommendation = random.choice(
        recommendations[status]
    )

    return jsonify({
        "status": status,
        "recommendation": recommendation
    })


if __name__ == "__main__":
    app.run(debug=True)