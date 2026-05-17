import { BriefcaseMedical, ChevronLeft, Heart, Info, Lightbulb, Mic, Paperclip, Send, Utensils} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Badges } from "../sections/Assets";

export default function ChatbotPage() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [infoChat, setInfoChat] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (customMessage = null) => {
        const finalMessage = customMessage || message;

        if (!finalMessage.trim()) return;

        const userMessage = {
            role: "user",
            text: finalMessage,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {method: "POST", headers: { "Content-Type": "application/json"},body: JSON.stringify({ message: finalMessage})});
            const data = await response.json();
            const botMessage = {
                role: "bot",
                text: data.response,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.log(error);

            const errorMessage = {
                role: "bot",
                text: "Maaf, terjadi kesalahan saat menghubungi SariAI.",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full grid grid-cols-12 grid-rows-[auto_1fr_auto] relative overflow-hidden">
            <div className="col-span-12 relative bg-white px-6 py-4 flex justify-between items-center border rounded-3xl border-sariblack/14">
                <div className="flex gap-4 items-center">
                    <img src="/src/assets/images/sari-profile.png" alt="" className="w-14 aspect-square object-cover rounded-full border-3 p-1 border-sariblue" />
                    <div>
                        <h2 className="text-xl font-mr font-semibold">SariAI</h2>
                        <h3 className="text-sm text-sarigray">Konsultan AI Kesehatan Jantung</h3>
                    </div>
                </div>

                <button onClick={() => setInfoChat(!infoChat)} className={`absolute top-4 right-6 flex items-center justify-center rounded-2xl text-sariblack/40 cursor-pointer z-50 p-4 transition-all duration-300 ${infoChat ? "w-66 bg-white dsh-cards flex-col gap-4" : "hover:bg-sariblack/8"}`}>
                    <Info size={infoChat ? 56 : 20} className={infoChat ? "text-sarired" : ""}/>
                    <p className={infoChat ? "block text-sm" : "hidden"}>SariAI adalah generatif AI kami sebagai sarana konsultasi instan.</p>
                    <p className={infoChat ? "block text-sm" : "hidden"}>SariAI adalah asisten informasi, bukan pengganti diagnosa medis profesional.</p>
                    <p className={infoChat ? "block text-sm font-bold" : "hidden"}>Dalam keadaan darurat, segera hubungi layanan medis setempat.</p>
                </button>
            </div>

            <div className="col-span-12 relative px-6 py-2 flex flex-col overflow-auto">
                {messages.length === 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="bubble-chat botinput bg-white">
                            Halo! Saya SariAI 👋 Saya di sini untuk membantu Anda memahami kesehatan jantung Anda. Apa yang ingin Anda tanyakan hari ini?
                        </p>
                        <span className="text-xs">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : ""} gap-2`}>
                        <p className={`bubble-chat ${msg.role === "user" ? "userinput" : "botinput"}`}>{msg.text}</p>
                        <span className="text-xs">{msg.time}</span>
                    </div>
                ))}
                {loading && (
                    <div className="flex flex-col gap-2">
                        <p className="bubble-chat botinput">Sari sedang mengetik...</p>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="col-span-12 flex flex-col gap-4 px-6">
                <div className="flex gap-2 overflow-x-auto px-4">
                    <button onClick={() => sendMessage("Apa itu detak jantung normal?")} className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
                        <Heart size={18}/> Apa itu detak jantung normal?
                    </button>

                    <button onClick={() => sendMessage("Tips diet rendah kolesterol")} className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
                        <Utensils size={18}/> Tips diet rendah kolesterol?
                    </button>

                    <button onClick={() => sendMessage("Kapan saya harus ke dokter?")} className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
                        <BriefcaseMedical size={18}/> Kapan saya harus ke dokter?
                    </button>
                </div>
                <div className="flex gap-2 items-center w-full bg-white border border-sariblack/14 rounded-3xl p-2">
                    <button className="p-4 hover:bg-sariblack/8 rounded-2xl"><Paperclip size={18} /></button>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} placeholder="Ketik pesan untuk Sahabat Sanubari..." className="outline-0 w-full text-sm" />
                    <button className="p-4 hover:bg-sariblack/8 rounded-2xl"><Mic size={20} /></button>
                    <button onClick={sendMessage} className="p-4 bg-sarired text-white rounded-2xl"><Send size={18} /></button>
                </div>

                <p className="text-sm/[145%] text-center text-sariblack/40">
                    <b>Sahabat Sanubari adalah asisten informasi, bukan pengganti diagnosa medis profesional.</b><br />Dalam keadaan darurat, segera hubungi layanan medis setempat.
                </p>
            </div>

            <div className={`fixed top-1/2 -translate-y-1/2 right-0 z-50 transition-all duration-500 ease-in-out flex items-center ${showSummary ? "translate-x-0" : "translate-x-80"}`}>
                <button onClick={() => setShowSummary(!showSummary)} className={`cursor-pointer bg-white border border-gray-200 py-4 pl-2 flex items-center transition-all duration-500 rounded-l-2xl ${showSummary ? "border-r-0 pr-2" : "pr-4 hover:pr-6"}`}>
                    <ChevronLeft size={24} className={`transition-transform duration-500 ${showSummary ? "rotate-180" : ""}`}/>
                    <div className={`transition-all duration-500 overflow-hidden relative flex items-center justify-center ${showSummary ? "w-0 opacity-0" : "w-max opacity-100 ml-2"}`}>
                        <Badges type={'ht'} className={'text-sarired size-18'} />
                        <Lightbulb className="size-8 absolute text-sariwhite" />
                    </div>
                </button>

                <div className={`w-[320px] h-112 bg-white border border-gray-200 border-l-0 rounded-3xl p-5 transition-all duration-500 ease-in-out flex flex-col gap-4 ${showSummary ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                    <h1 className="text-lg font-semibold font-mr text-sariblack">Ringkasan Hari Ini</h1>

                    <div className="relative flex flex-col gap-2 p-4 bg-[#F8FAFC] rounded-2xl">
                        <Heart size={18} className="text-sarired absolute top-4 right-4" />
                        <h1 className="uppercase text-sm font-semibold text-[#94A3B8] tracking-wide">BPM TERAKHIR</h1>
                        <p className="text-4xl font-bold flex items-end gap-1 leading-none">72 <span className="text-base font-medium mb-[2px]">BPM</span></p>
                        <span className="block h-2 bg-sariblack/10 rounded-full overflow-hidden mt-1">
                            <span className="block h-full bg-sariblue w-[72%] rounded-full"></span>
                        </span>
                        <p className="text-sariblue text-sm font-semibold mt-1">Rentang Normal</p>
                    </div>

                    <div className="bg-[#FF6F52] p-4 rounded-2xl flex flex-col gap-3 items-start text-white shadow-lg flex-1 justify-between">
                        <span className="block bg-white/20 p-3 rounded-xl"><Lightbulb size={20} className="text-white" /></span>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-mr font-semibold leading-tight">Saran Sahabat Sanubari</h2>
                            <p className="text-sm text-white/90 leading-relaxed">Berdasarkan data Anda, detak jantung Anda meningkat 5% hari ini. Cobalah meditasi 5 menit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}