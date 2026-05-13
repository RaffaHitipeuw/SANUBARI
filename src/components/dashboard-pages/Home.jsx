'use client'
import React, { useEffect, useRef } from 'react';

export default function Home() {
    const canvasRef = useRef(null);
    const bpmRef = useRef(null);
    const bpmStateRef = useRef({ current: 72, target: 72, display: 72 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const bpmEl = bpmRef.current;

        if (!canvas || !bpmEl) return;

        const ctx = canvas.getContext("2d");
        const W = canvas.parentElement.clientWidth - 40;
        const H = 90;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        ctx.scale(dpr, dpr);

        let t = 0;
        const bpmState = bpmStateRef.current;

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
            ctx.lineWidth = 5;
            ctx.lineCap = "round";

            const midY = H / 2;
            const amp = 18;

            for (let i = 0; i <= W; i++) {
                const x = i / W;
                const speed = bpmState.current / 60;
                const y = midY - heartWave(x * Math.PI * 4, t * speed) * amp;

                i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
            }

            ctx.stroke();

            t += 0.025;

            if (Math.random() < 0.01) {
                bpmState.target = Math.round(65 + Math.random() * 10);
            }

            bpmState.current += (bpmState.target - bpmState.current) * 0.01;
            bpmState.display += (bpmState.current - bpmState.display) * 0.12;

            bpmEl.textContent = Math.round(bpmState.display);

            requestAnimationFrame(draw);
        }

        draw();
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#f9f9f7] p-2">
            <div className="mb-6 mt-8 ml-5">
                <p className="text-gray-400 text-sm font-int mb-2">Jantung Anda hari ini terlihat sehat.</p>
                <h1 className="text-4xl font-semibold font-mr text-gray-900">Halo, Ahmad Fauzi!</h1>
            </div>

            <section className="w-full grid grid-cols-12 grid-rows-4 gap-4">
                <div className="dsh-cards col-span-8 row-span-2 bg-white rounded-[18px] p-6 shadow-sm flex flex-col justify-between">

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-int text-gray-400 uppercase tracking-wide mb-1">Last Measurement</p>
                            <h2 className="text-2xl font-semibold font-mr text-gray-900">Heart Rate Activity</h2>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                            <div className="w-2 h-2 bg-[#91C6C2] rounded-full"></div>
                            <span className="text-emerald-600 text-xs font-int font-bold">Stable</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 flex-1 my-4">
                        <div className="flex items-baseline gap-2">
                            <div ref={bpmRef} className="text-7xl font-bold text-gray-900 leading-none">
                                72
                            </div>
                            <span className="text-gray-400 text-sm font-mr font-semibold mb-2">BPM</span>
                        </div>
                        
                        <div className="flex-1 h-24">
                            <canvas ref={canvasRef} className="w-full h-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                        <div>
                            <p className="text-xs text-gray-400 font-int mb-1">Average</p>
                            <p className="text-lg font-bold font-int text-gray-900">68 BPM</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-int mb-1">Peak</p>
                            <p className="text-lg font-bold font-int text-gray-900">112 BPM</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-int mb-1">Resting</p>
                            <p className="text-lg font-bold font-int text-[#91C6C2]">62 BPM</p>
                        </div>
                    </div>
                </div>

                <div className="dsh-cards col-span-4 row-span-1"></div>
                <div className="dsh-cards col-span-4 row-span-1"></div>
                <div className="dsh-cards col-span-12 row-span-2"></div>
            </section>
        </div>
    );
}
