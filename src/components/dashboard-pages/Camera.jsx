import React, { useRef, useEffect, useState } from "react";

function HeartRateChart({ bpmRef }) {
  const canvasRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

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
    <div className="grid grid-cols-12 max-sm:grid-cols-1 grid-rows-3 max-sm:grid-rows-[auto] gap-3 h-full max-sm:h-auto w-full bg-sariwhite">
      <div className="col-span-8 max-sm:col-span-1 row-span-3 max-sm:row-span-1 max-sm:h-[50vh] rounded-2xl overflow-hidden bg-black relative">
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
      
      <div className="dsh-cards relative col-span-4 max-sm:col-span-1 row-span-2 max-sm:row-span-1 h-full bg-white border border-sariblack/8 flex flex-col gap-6">
        <div className="flex justify-between items-center max-sm:items-start">
          <div>
            <p className="text-sm max-sm:text-xs tracking-wide text-sariblack/40 uppercase mb-1">
              Mengukur BPM...
            </p>
            <h3 className="text-2xl max-sm:text-xl font-semibold font-mr leading-tight text-sariblack max-sm:mt-2">
              Aktivitas Detak Jantung
            </h3>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 max-sm:gap-1 bg-saribluelight/60 rounded-full px-3 py-1 text-base max-sm:text-xs font-semibold text-sariblue shrink-0">
            <span className="size-2 max-sm:size-1.5 rounded-full bg-sariblue" />
            Stable
          </div>
        </div>
        
        <div className="flex flex-col items-start h-full gap-3">
          <div className="flex flex-col items-center justify-center w-full h-full max-sm:order-2">
            <HeartRateChart bpmRef={bpmRef} />
          </div>
          <div className="flex items-end gap-2 shrink-0 max-sm:order-1">
            <span ref={bpmRef} className="text-7xl font-extrabold tracking-tighter text-sariblack">
              72
            </span>
            <span className="text-xl font-mr text-sariblack/40">BPM</span>
          </div>
        </div>

        <div className="flex pt-6 border-t border-sariblack/7">
          <div className="flex-1 text-left">
            <p className="text-sm text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Average</p>
            <p className="text-base font-bold text-sariblack">68 BPM</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-sm text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Peak</p>
            <p className="text-base font-bold text-sariblack">112 BPM</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm text-sariblack/40 font-int uppercase tracking-wide mb-0.5">Resting</p>
            <p className="text-base font-bold text-sariblue">62 BPM</p>
          </div>
        </div>
      </div>

      <div className="dsh-cards max-sm:h-64 col-span-4 max-sm:col-span-1 row-span-2 max-sm:row-span-1 shrink-0 bg-white border-sariblack/8 flex flex-col gap-2">
        <h3 className="text-base font-medium text-sariblack font-">Tambahkan Catatan</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Morning po..."
          className="resize-none border-none h-full outline-none text-base text-sariblack/50 font-int font-medium leading-relaxed bg-transparent"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white cursor-pointer transition"
            style={{ background: saved ? "#3d8b87" : "#5aada8", border: "none" }}
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
