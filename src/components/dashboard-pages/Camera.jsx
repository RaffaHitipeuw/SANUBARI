import React, { useRef, useEffect, useState } from "react";

function HeartRateChart({ bpmRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.parentElement.clientWidth;
      const H = 70;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };
    resize();

    let t = 0, currentBpm = 72, targetBpm = 72, displayBpm = 72, raf;

    const draw = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, "rgba(255,82,103,0)");
      grad.addColorStop(0.3, "rgba(255,82,103,0.85)");
      grad.addColorStop(0.7, "rgba(255,82,103,0.85)");
      grad.addColorStop(1, "rgba(255,82,103,0)");

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const midY = H / 2, amp = 16, speed = currentBpm / 60;
      for (let i = 0; i <= W; i++) {
        const x = i / W;
        const wave =
          Math.sin(x * Math.PI * 4 + t * speed) * 0.7 +
          Math.sin(x * Math.PI * 2 + t * speed * 0.5) * 0.3;
        const y = midY - wave * amp;
        i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
      }
      ctx.stroke();

      t += 0.022;
      if (Math.random() < 0.008) targetBpm = Math.round(65 + Math.random() * 15);
      currentBpm += (targetBpm - currentBpm) * 0.01;
      displayBpm += (currentBpm - displayBpm) * 0.1;

      if (bpmRef?.current) bpmRef.current.textContent = Math.round(displayBpm);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  
  useEffect(() => {
  let stream;
  navigator.mediaDevices
    .getUserMedia({ 
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        zoom: { ideal: 1 }
      }, 
      audio: false 
    })
    .then((s) => {
      stream = s;
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.play();
      }
    })
    .catch(() => setCameraError(true));
  return () => stream?.getTracks().forEach((t) => t.stop());
}, []);


  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "70px", display: "block" }} />
  );
}

export default function CameraPage() {
  const videoRef = useRef(null);
  const bpmRef = useRef(null);
  const [note, setNote] = useState("");
  const [cameraError, setCameraError] = useState(false);
  const [saved, setSaved] = useState(false);

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
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  const handleSave = () => {
    if (!note.trim()) return;
    setSaved(true);
    setNote("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 h-full p-1 bg-sariwhite">
      <div className="flex-1 rounded-2xl overflow-hidden bg-black relative min-h-0">
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
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        )}

        <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.85)} }`}</style>
      </div>

      <div className="flex gap-3 h-[255px] flex-shrink-0">
        <div className="w-[1010px] bg-white rounded-2xl px-5 py-3 border border-sariblack/8 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-base font-int tracking-widest text-sariblack/40 uppercase leading-none mb-1">
                Measuring BPM...
              </p>
              <h3 className="text-xl font-semibold font-mr leading-tight text-sariblack">
                Heart Rate Activity
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-saribluelight/60 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-sariblue flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-sariblue" />
              Stable
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-0.5 flex-shrink-0" style={{ lineHeight: 1 }}>
              <span ref={bpmRef} className="text-[44px] font-int font-extrabold tracking-tighter text-sariblack" style={{ lineHeight: 1 }}>
                72
              </span>
              <span className="text-[10px] font-mr text-sariblack/40 pb-1">BPM</span>
            </div>
            <div className="flex-1 min-w-0">
              <HeartRateChart bpmRef={bpmRef} />
            </div>
          </div>

          <div className="flex pt-2 border-t border-sariblack/7">
            <div className="flex-1 text-left">
              <p className="text-[9px] text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Average</p>
              <p className="text-xs font-bold text-sariblack">68 BPM</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-[9px] text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Peak</p>
              <p className="text-xs font-bold text-sariblack">112 BPM</p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-[9px] text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Resting</p>
              <p className="text-xs font-bold text-sariblue">62 BPM</p>
            </div>
          </div>
        </div>

        <div className="w-[370px] flex-shrink-0 bg-white rounded-2xl px-4 py-3 border border-sariblack/8 flex flex-col gap-2">
          <h3 className="text-sm font-medium text-sariblack font-int">Add Note...</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Morning po..."
            className="flex-1 resize-none border-none outline-none text-xs text-sariblack/50 font-int font-medium leading-relaxed bg-transparent"
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleSave}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-white cursor-pointer transition"
              style={{ background: saved ? "#3d8b87" : "#5aada8", border: "none" }}
            >
              {saved ? "Saved ✓" : "Save Note"}
            </button>
            <button
              onClick={() => setNote("")}
              className="flex-1 py-1.5 rounded-lg border border-sariblack/12 bg-transparent text-[11px] font-semibold text-sariblack/50 cursor-pointer hover:bg-sariblack/5 transition"
            >
              Discard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
