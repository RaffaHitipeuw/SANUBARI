import React, { useRef, useEffect, useState, useCallback } from "react";
import { TutorialImages } from "../sections/Assets";
import {
  Accessibility,
  BicepsFlexed,
  GraduationCap,
  Group,
} from "lucide-react";

// ─── Real rPPG Waveform ────────────────────────────────────────────────────────
// Draws the actual chrom_signal received from the backend as a scrolling chart.
function HeartRateChart({ signalBuffer }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.parentElement?.clientWidth || 300;
      const H   = 70;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    ctx.clearRect(0, 0, W, H);

    if (!signalBuffer || signalBuffer.length < 2) {
      // Draw flat idle line while waiting for signal
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0,   "rgba(255,82,103,0)");
      grad.addColorStop(0.5, "rgba(255,82,103,0.35)");
      grad.addColorStop(1,   "rgba(255,82,103,0)");
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.5;
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      return;
    }

    // Normalize signal to canvas height
    const points = signalBuffer;
    const minVal = Math.min(...points);
    const maxVal = Math.max(...points);
    const range  = maxVal - minVal || 1;
    const pad    = 8;
    const stepX  = W / Math.max(points.length - 1, 1);

    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,    "rgba(255,82,103,0)");
    grad.addColorStop(0.12, "rgba(255,82,103,0.9)");
    grad.addColorStop(0.88, "rgba(255,82,103,0.9)");
    grad.addColorStop(1,    "rgba(255,82,103,0)");

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 2;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";

    points.forEach((v, i) => {
      const x = i * stepX;
      const y = H - pad - ((v - minVal) / range) * (H - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else         ctx.lineTo(x, y);
    });

    ctx.stroke();

    return () => window.removeEventListener("resize", resize);
  }, [signalBuffer]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "70px", display: "block" }}
    />
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function CameraPage() {
  const videoRef     = useRef(null);
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);

  // ── Live rPPG state ──────────────────────────────────────────────────────────
  const [bpm,          setBpm]          = useState(72);
  const [bpmHistory,   setBpmHistory]   = useState([]);
  const [signalBuffer, setSignalBuffer] = useState([]); // real chrom_signal waveform
  const [respRate,     setRespRate]     = useState(0);
  const [stressIndex,  setStressIndex]  = useState(0);
  const [arrhythmia,   setArrhythmia]   = useState(false);

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [note,        setNote]        = useState("");
  const [cameraError, setCameraError] = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [faceBox,     setFaceBox]     = useState(null);
  const [connected,   setConnected]   = useState(false);
  const [measuring,   setMeasuring]   = useState(false);

  // ── Tutorial state ───────────────────────────────────────────────────────────
  const [tutorialDone, setTutorialDone] = useState(false);
  const [tutorial,     setTutorial]     = useState(1);

  // ── Derived stats (rolling 100 readings) ────────────────────────────────────
  const avgBpm     = bpmHistory.length > 0 ? Math.round(bpmHistory.reduce((a, b) => a + b, 0) / bpmHistory.length) : null;
  const peakBpm    = bpmHistory.length > 0 ? Math.round(Math.max(...bpmHistory)) : null;
  const restingBpm = bpmHistory.length > 0 ? Math.round(Math.min(...bpmHistory)) : null;

  // ── Status badge ─────────────────────────────────────────────────────────────
  const getStatus = (b) => {
    if (!measuring) return { label: "Menunggu", dotCls: "bg-gray-400",   textCls: "text-gray-400",   bgCls: "bg-gray-100" };
    if (arrhythmia) return { label: "Aritmia",  dotCls: "bg-orange-400", textCls: "text-orange-500", bgCls: "bg-orange-50" };
    if (b < 60)     return { label: "Rendah",   dotCls: "bg-yellow-400", textCls: "text-yellow-600", bgCls: "bg-yellow-50" };
    if (b <= 100)   return { label: "Stable",   dotCls: "bg-sariblue",   textCls: "text-sariblue",   bgCls: "bg-saribluelight/60" };
    return                  { label: "Tinggi",  dotCls: "bg-red-400",    textCls: "text-red-500",    bgCls: "bg-red-50" };
  };
  const status = getStatus(bpm);

  // ── Face box: scale + mirror for object-cover display ───────────────────────
  const getDisplayFaceBox = useCallback((face) => {
    const video     = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !face) return null;

    const vW = video.videoWidth;
    const vH = video.videoHeight;
    const cW = container.clientWidth;
    const cH = container.clientHeight;
    if (!vW || !vH) return null;

    const scale     = Math.max(cW / vW, cH / vH);
    const offsetX   = (cW - vW * scale) / 2;
    const offsetY   = (cH - vH * scale) / 2;
    const mirroredX = vW - face.x - face.w; // flip X for scaleX(-1) video

    return {
      left:   mirroredX * scale + offsetX,
      top:    face.y    * scale + offsetY,
      width:  face.w    * scale,
      height: face.h    * scale,
    };
  }, []);

  // ── Tutorial content ─────────────────────────────────────────────────────────
  const tutorialContent = [
    {
      indo:    "Pastikan wajah Anda di tengah Kamera selama proses berlangsung",
      inggris: "Make sure your face stays centered throughout this process.",
    },
    {
      indo:    "Jangan bergerak selama proses pengecekan berlangsung",
      inggris: "Don't move nor make any sudden movements throughout the process.",
    },
    {
      indo:    "Pastikan muka anda terpapar cahaya dan cukup penerangan.",
      inggris: "Make sure you have enough adjusted lighting to your face.",
    },
    {
      indo:    "Pilih opsi di atas yang menunjukan diri Anda",
      inggris: "Pick which one of these that is related to you",
    },
  ];

  const optionsContent = [
    { icon: GraduationCap, indo: "Pelajar",  inggris: "Student"  },
    { icon: Accessibility,  indo: "Lansia",   inggris: "Elderly"  },
    { icon: BicepsFlexed,   indo: "Atlet",    inggris: "Athlete"  },
    { icon: Group,          indo: "Lainnya",  inggris: "Others"   },
  ];

  // ── Camera + rPPG loop ───────────────────────────────────────────────────────
  useEffect(() => {
    let stream;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
      })
      .catch(() => setCameraError(true));

    // 200ms = ~5fps to backend; enough for rPPG without overloading
    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video  = videoRef.current;
      const canvas = canvasRef.current;
      if (!video.videoWidth) return;

      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;

      // Capture UN-mirrored frame — backend needs real face coordinates
      canvas.getContext("2d").drawImage(video, 0, 0);
      const image = canvas.toDataURL("image/jpeg", 0.8);

      try {
        const res  = await fetch("http://localhost:5000/process-frame", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ image }),
        });
        const data = await res.json();

        setConnected(true);

        if (data.success) {
          const newBpm = data.bpm;
          setBpm(newBpm);
          setMeasuring(true);

          // Rolling BPM history for avg/peak/resting stats
          setBpmHistory((prev) => {
            const next = [...prev, newBpm];
            return next.length > 100 ? next.slice(-100) : next;
          });

          // Real rPPG signal → scrolling waveform (160-point window)
          if (data.signal && data.signal.length > 0) {
            setSignalBuffer((prev) => {
              const next = [...prev, ...data.signal];
              return next.length > 160 ? next.slice(-160) : next;
            });
          }

          // Extra vitals (no confidence/sqi passed through)
          if (data.resp_rate    != null) setRespRate(data.resp_rate);
          if (data.stress_index != null) setStressIndex(data.stress_index);
          if (data.arrhythmia   != null) setArrhythmia(data.arrhythmia);

          // Face bounding box
          setFaceBox(data.face ?? null);
        }
      } catch {
        setConnected(false);
        setFaceBox(null);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleSave = () => {
    if (!note.trim()) return;

    const healthData = {
      bpm,
      respRate,
      stressIndex,
      arrhythmia,
      note,
      date: new Date().toLocaleString(),
    };
    const existingData =
      JSON.parse(localStorage.getItem("healthHistory")) || [];
    const updatedData = [healthData, ...existingData];

    localStorage.setItem(
      "healthHistory",
      JSON.stringify(updatedData)
    );
  
    setSaved(true);
    setNote("");
  
    setTimeout(() => setSaved(false), 2000);
  };

  const displayBox = faceBox ? getDisplayFaceBox(faceBox) : null;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="relative grid grid-cols-12 max-sm:grid-cols-1 grid-rows-3 max-sm:grid-rows-[auto] gap-3 h-full max-sm:h-auto w-full bg-sariwhite">

      {/* ── Tutorial overlay ───────────────────────────────────────────────── */}
      {!tutorialDone && (
        <div className="absolute w-full z-6 flex flex-col items-center justify-center gap-12 h-full dsh-cards border-sariblack/14 bg-white">
          <p>{tutorial}/4</p>

          {tutorial <= 3 && (
            <TutorialImages tutNumber={tutorial} className={"w-140"} />
          )}

          {tutorial === 4 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              {optionsContent.map((item, index) => (
                <button
                  key={index}
                  className="cursor-pointer rounded-3xl group col-span-1 flex flex-col items-start p-6 border-3 opacity-50 border-sariblack/14 hover:opacity-100 justify-between w-56 h-42 relative overflow-hidden"
                >
                  <span className="font-mr text-2xl font-semibold">{item.indo}</span>
                  <span>{item.inggris}</span>
                  <item.icon className="size-41 absolute -bottom-10 -right-10 -rotate-5" />
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col items-center gap-6 w-[55%] text-center">
            <h1 className="font-mr text-4xl/[130%] font-semibold tracking-tight">
              {tutorialContent[tutorial - 1].indo}
            </h1>
            <h2>{tutorialContent[tutorial - 1].inggris}</h2>

            <span className="flex gap-2">
              <button
                onClick={() =>
                  tutorial !== 4 ? setTutorial(tutorial + 1) : setTutorialDone(true)
                }
                className="cursor-pointer flex items-center gap-2 py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-2xl max-sm:rounded-lg bg-sariblue mt-4 font-semibold text-white max-sm:text-sm z-2"
              >
                {tutorial !== 4 ? "Selanjutnya" : "Mulai Mengukur"}
              </button>

              {tutorial !== 4 && (
                <button
                  onClick={() => setTutorial(4)}
                  className="cursor-pointer flex items-center gap-2 py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-2xl max-sm:rounded-lg border border-sariblue hover:bg-sariblue mt-4 font-semibold text-sariblue hover:text-white max-sm:text-sm z-2"
                >
                  Lewati Tutorial
                </button>
              )}
            </span>
          </div>
        </div>
      )}

      {/* ── Camera feed ────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="col-span-8 max-sm:col-span-1 row-span-3 max-sm:row-span-1 max-sm:h-[50vh] rounded-3xl overflow-hidden bg-black relative"
      >
        {cameraError ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-white/40">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
            <p className="text-sm">Camera access denied</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />

            {/* Hidden canvas for frame capture */}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {/* Face box — scaled + X-flipped to match mirrored video */}
            {displayBox && (
              <div
                className="absolute border-2 border-green-400 rounded-xl pointer-events-none"
                style={{
                  left:       displayBox.left,
                  top:        displayBox.top,
                  width:      displayBox.width,
                  height:     displayBox.height,
                  transition: "all 0.1s linear",
                }}
              />
            )}

            {/* Backend connection badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">
              <span className={`size-2 rounded-full ${connected ? "bg-green-400" : "bg-red-400 animate-pulse"}`} />
              {connected ? (measuring ? "Mengukur detak jantung..." : "Terhubung") : "Menghubungkan ke backend..."}
            </div>
          </>
        )}
      </div>

      {/* ── BPM card ───────────────────────────────────────────────────────── */}
      <div className="dsh-cards relative col-span-4 max-sm:col-span-1 row-span-2 max-sm:row-span-1 h-full bg-white border border-sariblack/8 flex flex-col gap-6">

        <div className="flex justify-between items-center max-sm:items-start">
          <div>
            <p className="text-sm max-sm:text-xs tracking-wide text-sariblack/40 uppercase mb-1">
              {measuring ? "Live BPM" : "Mengukur BPM..."}
            </p>
            <h3 className="text-2xl max-sm:text-xl font-semibold font-mr leading-tight text-sariblack max-sm:mt-2">
              Aktivitas Detak Jantung
            </h3>
          </div>

          <div className={`absolute top-4 right-4 flex items-center gap-2 max-sm:gap-1 ${status.bgCls} rounded-full px-3 py-1 text-base max-sm:text-xs font-semibold ${status.textCls} shrink-0`}>
            <span className={`size-2 max-sm:size-1.5 rounded-full ${status.dotCls}`} />
            {status.label}
          </div>
        </div>

        <div className="flex flex-col items-start h-full gap-3">

          {/* Real rPPG waveform from chrom_signal */}
          <div className="flex flex-col items-center justify-center w-full h-full max-sm:order-2">
            <HeartRateChart signalBuffer={signalBuffer} />
          </div>

          {/* Live BPM number */}
          <div className="flex items-end gap-2 shrink-0 max-sm:order-1">
            <span className="text-7xl font-extrabold tracking-tighter text-sariblack">
            {avgBpm != null ? `${avgBpm}` : "—"}
            </span>
            <span className="text-xl font-mr text-sariblack/40">BPM</span>
          </div>
        </div>

        {/* Stats — live from bpmHistory */}
        <div className="flex pt-6 border-t border-sariblack/7">
          <div className="flex-1 text-left">
            <p className="text-sm text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Average</p>
            <p className="text-base font-bold text-sariblack">{avgBpm != null ? `${avgBpm} BPM` : "—"}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-sm text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Peak</p>
            <p className="text-base font-bold text-sariblack">{peakBpm != null ? `${peakBpm} BPM` : "—"}</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Resting</p>
            <p className="text-base font-bold text-sariblue">{restingBpm != null ? `${restingBpm} BPM` : "—"}</p>
          </div>
        </div>
      </div>

      {/* ── Notes + extra vitals ───────────────────────────────────────────── */}
      <div className="dsh-cards max-sm:h-64 col-span-4 max-sm:col-span-1 row-span-2 max-sm:row-span-1 shrink-0 bg-white border-sariblack/8 flex flex-col gap-2">

        {/* Resp rate + stress — shown once rPPG has enough data (no confidence) */}
        {measuring && (respRate > 0 || stressIndex > 0) && (
          <div className="flex gap-3 pb-3 mb-1 border-b border-sariblack/7">
            {respRate > 0 && (
              <div className="flex-1">
                <p className="text-xs text-sariblack/40 uppercase tracking-wide mb-0.5">Pernapasan</p>
                <p className="text-sm font-bold text-sariblack">
                  {respRate} <span className="font-normal text-sariblack/40 text-xs">rpm</span>
                </p>
              </div>
            )}
            {stressIndex > 0 && (
              <div className="flex-1">
                <p className="text-xs text-sariblack/40 uppercase tracking-wide mb-0.5">Stres</p>
                <p className={`text-sm font-bold ${
                  stressIndex > 60 ? "text-red-500" : stressIndex > 35 ? "text-yellow-500" : "text-green-500"
                }`}>
                  {stressIndex > 60 ? "Tinggi" : stressIndex > 35 ? "Sedang" : "Rendah"}
                </p>
              </div>
            )}
          </div>
        )}

        <h3 className="text-base font-medium text-sariblack">Tambahkan Catatan</h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Morning po..."
          className="resize-none border-none h-full outline-none text-base text-sariblack/50 font-int font-medium leading-relaxed bg-transparent"
        />

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className={`${saved && "opacity-60 pointer-events-none"} bg-sariblue flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white cursor-pointer transition`}
          >
            {saved ? "Tersimpan ✓" : "Simpan"}
          </button>
          <button
            onClick={() => setNote("")}
            className="flex-1 py-2 px-4 rounded-lg border border-sariblack/12 bg-transparent text-sm font-semibold text-sariblack/50 cursor-pointer hover:bg-sariblack/5 transition"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
