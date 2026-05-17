import { useEffect, useRef } from "react";
import personImg from "../../assets/icons/person.svg";

export default function FaceScanner() {

  const characterRef = useRef(null);
  const scanLineRef = useRef(null);
  const bpmTextRef = useRef(null);

  useEffect(() => {

    let t = 0;
    let bpm = 65;
    let targetBpm = 65;
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {

      t += 0.03;

      const character = characterRef.current;
      const scanLine = scanLineRef.current;
      const bpmText = bpmTextRef.current;

      if (!character || !scanLine || !bpmText) return;

      const floatY = Math.sin(t) * 4;
      character.style.transform = `translateX(-50%) translateY(${floatY}px)`;

      const scanProgress = (Math.sin(t * 2) + 1) / 2;
      scanLine.style.top = `${scanProgress * 100}%`;

      if (Math.random() < 0.02) {
        targetBpm = 60 + Math.random() * 10;
      }
      bpm = lerp(bpm, targetBpm, 0.05);
      bpmText.textContent = `${Math.round(bpm)} BPM`;
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);

  }, []);

  return (

    <div className="w-[420px] h-[260px] bg-white rounded-[20px] relative overflow-hidden shadow-lg">
      <div ref={characterRef} className="absolute bottom-[-12px] left-1/2 w-[280px]">
        <img src={personImg} alt="person" className="w-[300px] block"/>
        
        <div className="absolute w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] border-2 border-[#7cc7c4] pointer-events-none" style={{ top: "28%", left: "50%", transform: "translate(-50%, -50%)"}}>
          <div ref={bpmTextRef} className="absolute -top-4 right-1 text-[11px] text-[#7cc7c4] font-mono whitespace-nowrap">
            65 BPM
          </div>

          <div ref={scanLineRef} className="absolute w-full h-[2px] bg-[#7cc7c4]"/>
        </div>
      </div>
    </div>
  );
}