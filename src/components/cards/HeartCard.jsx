import { useEffect, useRef } from "react";

export default function HeartCard() {
  const canvasRef = useRef(null);
  const bpmRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    const linesConfig = [
      { width: "30%", opacity: 1 },
      { width: "45%", opacity: 1 },
      { width: "70%", opacity: 1 },
    ];

    const container = linesRef.current;
    container.innerHTML = "";

    linesConfig.forEach(line => {
      const el = document.createElement("div");
      el.style.width = line.width;
      el.style.opacity = line.opacity;
      el.className = "h-[2px] bg-gray-200 rounded";
      container.appendChild(el);
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bpmEl = bpmRef.current;

    const W = canvas.parentElement.clientWidth - 40;
    const H = 90;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    let t = 0;
    let currentBpm = 72;
    let targetBpm = 72;
    let displayBpm = 72;

    function heartWave(x, time) {
      return Math.sin(x * 2 + time) * 0.6;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const gradient = ctx.createLinearGradient(0, 0, W, 0);
      gradient.addColorStop(0, "rgba(255,120,100,0)");
      gradient.addColorStop(0.5, "rgba(255,99,71,0.9)");
      gradient.addColorStop(1, "rgba(255,120,100,0)");

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      const midY = H / 2;
      const amp = 18;

      for (let i = 0; i <= W; i++) {
        const x = i / W;
        const speed = currentBpm / 60;
        const y = midY - heartWave(x * Math.PI * 4, t * speed) * amp;

        i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
      }

      ctx.stroke();

      t += 0.025;

      if (Math.random() < 0.01) {
        targetBpm = Math.round(68 + Math.random() * 12);
      }

      currentBpm += (targetBpm - currentBpm) * 0.01;
      displayBpm += (currentBpm - displayBpm) * 0.12;

      bpmEl.textContent = Math.round(displayBpm);

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <div className="w-[420px] bg-white rounded-[20px] px-5 pt-5 pb-4 border border-gray-100 shadow-lg">
      <canvas ref={canvasRef} className="w-full h-[90px]" />

      <div className="flex items-center mt-3 gap-3">
        <div className="flex items-end gap-1">
          <div ref={bpmRef} className="text-[48px] font-bold text-gray-900 leading-none tracking-tight">
            72
          </div>
          <div className="text-xs text-gray-400 mb-2">BPM</div>
        </div>

        <div ref={linesRef} className="flex-1 flex flex-col gap-1.5 ml-1"></div>

        <div className="ml-auto bg-emerald-50 rounded-full p-2.5 flex items-center justify-center ring-1 ring-emerald-100">
          👍
        </div>
      </div>
    </div>
  );
}