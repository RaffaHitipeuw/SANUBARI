import { useEffect, useRef } from "react";
import personImg from "./assets/person.svg";

export default function FaceScanner() {
  const characterRef = useRef(null);
  const scannerRef = useRef(null);
  const scanLineRef = useRef(null);
  const bpmTextRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    let t = 0;
    let bpm = 65;
    let targetBpm = 65;
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      t += 0.03;

      const character = characterRef.current;
      const scanner = scannerRef.current;
      const scanLine = scanLineRef.current;
      const bpmText = bpmTextRef.current;
      const card = cardRef.current;

      if (!character || !scanner || !scanLine || !bpmText || !card) return;

      const floatY = Math.sin(t) * 4;
      character.style.transform = `translate(-50%, ${floatY}px)`;

      const cardRect = card.getBoundingClientRect();
      const charRect = character.getBoundingClientRect();

      const headX = charRect.left + charRect.width / 2 - cardRect.left;
      const headY = charRect.top + charRect.height * 0.28 - cardRect.top;

      scanner.style.left = `${headX - 70}px`;
      scanner.style.top = `${headY - 70}px`;

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
    <div
      ref={cardRef}
      className="w-[420px] h-[260px] bg-white rounded-[20px] relative overflow-hidden shadow-lg"
    >
      <div
        ref={characterRef}
        className="absolute bottom-[-12px] left-1/2 -translate-x-1/2"
      >
        <img src={personImg} alt="person" className="w-[220px] block" />
      </div>

      <div
        ref={scannerRef}
        className="absolute w-[140px] h-[140px] border-2 border-[#7cc7c4] pointer-events-none"
      >
        <div
          ref={bpmTextRef}
          className="absolute -top-4 right-1 text-[11px] text-[#7cc7c4] font-mono"
        >
          65 BPM
        </div>

        <div
          ref={scanLineRef}
          className="absolute w-full h-[2px] bg-[#7cc7c4]"
        />
      </div>
    </div>
  );
}