import { ArrowRight, BotMessageSquare, Trash2 } from "lucide-react";
import { Badges } from "../sections/Assets";
import { NavLink } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import React, { useEffect, useRef, useState  } from 'react';

export default function Home() {
    const [userName, setUserName] = useState("");
    const canvasRef = useRef(null);
    const bpmRef = useRef(null);
    const bpmStateRef = useRef({ current: 72, target: 72, display: 72 });

    // Data Dummy untuk Recent Activity
    const activities = [
        { date: "Today, 08:45 AM", bpm: "72", status: "NORMAL", note: "Post-morning walk", type: "normal" },
        { date: "Yesterday, 10:20 PM", bpm: "65", status: "RESTING", note: "Before sleep", type: "resting" },
        { date: "Yesterday, 04:15 PM", bpm: "115", status: "ELEVATED", note: "Cardio workout", type: "elevated" },
        { date: "24 Oct, 09:00 AM", bpm: "74", status: "NORMAL", note: "At office desk", type: "normal" },
        { date: "23 Oct, 11:30 PM", bpm: "62", status: "RESTING", note: "Deep sleep initial", type: "resting" },
    ];

    const getStatusStyle = (type) => {
        switch (type) {
            case 'normal': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
            case 'resting': return 'bg-cyan-50 text-cyan-500 border-cyan-100';
            case 'elevated': return 'bg-rose-50 text-rose-500 border-rose-100';
            default: return 'bg-gray-50 text-gray-500 border-gray-100';
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName);
            }
        });
    
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
        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full grid grid-cols-12 max-sm:grid-cols-1 gap-4 mt-2 max-sm:mt-0">
            <div className="col-span-12 max-sm:col-span-1 px-6 max-sm:px-4 py-2 max-sm:py-0 flex flex-col gap-2 max-sm:gap-1">
                <h1 className="text-4xl max-sm:text-2xl font-semibold font-mr text-sariblack">Halo, {userName}!</h1>
                <p className="text-sarigray text-base max-sm:text-sm">Jantung Anda hari ini terlihat sehat.</p>
            </div>

            {/* HEART RATE */}
            <div className="dsh-cards border-sariblack/14 col-span-8 max-sm:col-span-1 row-span-2 max-sm:row-span-1 bg-white p-6 flex flex-col justify-between h-full">
                <div className="relative flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm max-sm:text-xs tracking-wide text-sariblack/40 uppercase mb-1">Last Measurement</p>
                        <h2 className="text-2xl max-sm:text-xl font-semibold font-mr text-gray-900 max-sm:mt-2">Aktivitas Detak Jantung</h2>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                        <div className="w-2 h-2 bg-emerald-200 rounded-full"></div>
                        <span className="text-emerald-600 text-xs font-int font-bold">Stable</span>
                    </div>
                </div>

                <div className="flex max-sm:flex-col items-center max-sm:items-stretch gap-6 flex-1 my-4">
                    <div className="flex items-baseline gap-2 max-sm:order-2">
                        <div ref={bpmRef} className="text-7xl font-bold text-gray-900 leading-none">72</div>
                        <span className="text-gray-400 text-sm font-mr font-semibold mb-2">BPM</span>
                    </div>
                    <div className="flex-1 h-24 max-sm:shrink-0 max-sm:order-1">
                        <canvas ref={canvasRef} className="w-full h-full max-sm:shrink-0" />
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
                        <p className="text-lg font-bold font-int text-sariblue">62 BPM</p>
                    </div>
                </div>
            </div>

            <div className="dsh-cards bg-saribluelight border-sariblue col-span-4 max-sm:col-span-1 row-span-1 flex flex-col items-start gap-2 relative overflow-clip justify-between">
                <span className="relative flex items-center justify-center z-2">
                    <Badges type={'rtt'} className={'text-sariwhite/60 w-16 h-auto'} />
                    <BotMessageSquare size={24} className="absolute text-sariblue" />
                </span>
                <h1 className="text-xl font-semibold font-mr text-sariblack z-2">Konsultasi dengan AI</h1>
                <p className="text-sm text-sarigray z-2">Dapatkan saran medis instan oleh AI.</p>
                <NavLink to={'/dashboard/chatbot'} className={'flex items-center gap-2 py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-2xl max-sm:rounded-lg bg-sariwhite/60 mt-4 font-semibold text-sariblue max-sm:text-sm z-2'}>Mulai Sesi<ArrowRight size={16}/></NavLink>
                <BotMessageSquare size={144} className="absolute -bottom-4 -right-4 -rotate-16 text-sariblue" />
            </div>

            <NavLink to={'/dashboard/blog'} className="flex flex-col rounded-3xl max-sm:rounded-2xl border bg-white border-sariblack/14 col-span-4 max-sm:col-span-1 row-span-1 overflow-clip relative">
                <img src="/src/assets/images/5tips.png" alt="" className="w-full h-40 object-cover" />
                <span className="absolute top-4 left-4 bg-sariredlight text-sarired font-bold px-3 py-1 rounded-lg text-sm uppercase">Artikel Baru</span>
                <div className="flex flex-col gap-2 p-6 max-sm:p-4">
                    <h1 className="text-xl font-mr font-semibold">5 Tips Jantung Sehat di Usia 30-an</h1>
                    <h2 className="text-sm text-sarigray line-clamp-3">Pagi hari saat perut kosong atau sore hari setelah beraktivitas? Temukan jawabannya…</h2>
                </div>
                <p className="flex items-center max-sm:w-full max-sm:justify-center gap-2 rounded-2xl p-6 max-sm:p-4">
                    Selengkapnya <ArrowRight size={18} />
                </p>
            </NavLink>

            <div className="dsh-cards bg-white border-sariblack/14 col-span-12 max-sm:col-span-1 row-span-2 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl/[120%] font-semibold font-mr text-sariblack">Recent Activity</h2>
                    <span className="text-sm font-semibold text-gray-200 max-sm:text-right max-sm:w-full">View All History</span>
                </div>

                <div className="w-full h-px bg-gray-50 mb-8"></div>

                <div className="flex items-center justify-center py-24">
                    <p className="text-gray-200 font-semibold font-mr tracking-wide">No Recent Activity</p>
                </div>
            </div>
        </div>
    );
}
