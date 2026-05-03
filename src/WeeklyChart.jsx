import { useEffect, useRef } from "react";

export default function WeeklyChart() {
  const barsRef = useRef([]);

  useEffect(() => {
    const bars = barsRef.current;

    const base = 120;
    let t = 0;

    let phases = bars.map(() => Math.random() * Math.PI * 2);
    let amps = bars.map(() => 40 + Math.random() * 40);

    let globalTime = 0;
    const LOOP = 4000;

    function easeInOut(x) {
      return 0.5 * (1 - Math.cos(Math.PI * x));
    }

    function animate() {
      globalTime += 16;

      const p = (globalTime % LOOP) / LOOP;
      const speedFactor = easeInOut(Math.sin(p * Math.PI));

      t += 0.05 * speedFactor;

      bars.forEach((bar, i) => {
        const wave = Math.sin(t + phases[i]);
        const normalized = (wave + 1) / 2;
        const height = base + normalized * amps[i];

        if (bar) bar.style.height = height + "px";
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="w-[420px] h-[260px] bg-white rounded-[20px] p-4 border border-gray-100 shadow-lg flex items-end">
      {[0,1,2,3].map((_, i) => (
        <div
          key={i}
          ref={el => barsRef.current[i] = el}
          className="flex-1 bg-emerald-500/25 border-t-[4px] border-[#6BAFA8] rounded-t-[8px]"
        />
      ))}
    </div>
  );
}