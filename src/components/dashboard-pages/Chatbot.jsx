import { BriefcaseMedical, ChevronLeft, Heart, Info, Lightbulb, Mic, Paperclip, Send, Utensils} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
        <div className="w-full h-screen grid grid-rows-[auto_1fr_auto] relative overflow-hidden bg-[#F9F9F5] pt-4">
            <div className="relative bg-white px-6 py-4 flex justify-between items-center border rounded-3xl border-sariblack/14 mx-4 mt-4 shrink-0">
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

            <div className="relative px-6 py-2 flex flex-col overflow-hidden min-h-0">
                <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="flex flex-col gap-6 pb-6">
                        {messages.length === 0 && (
                            <div className="flex flex-col gap-2">
                                <p className="bubble-chat botinput bg-white">
                                    Halo! Saya SariAI 👋 Saya di sini untuk membantu Anda memahami kesehatan jantung Anda. Apa yang ingin Anda tanyakan hari ini?
                                </p>
                                <span className="text-xs">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : ""}`}>
                                <div className="flex flex-col gap-2">
                                    <p className={`bubble-chat ${msg.role === "user" ? "userinput" : "botinput"}`}>{msg.text}</p>
                                    <span className="text-xs">{msg.time}</span>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex flex-col gap-2">
                                <p className="bubble-chat botinput">Sari sedang mengetik...</p>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>
                </div>

                <div className="shrink-0 bg-[#F9F9F5] pt-4 pb-2">
                    <div className="flex gap-[5px] overflow-x-auto pl-6">
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
                </div>
            </div>

            <div className="px-12 py-1 flex flex-col gap-3 shrink-0">
                <div className="flex gap-2 items-center w-full bg-white border border-sariblack/14 rounded-3xl p-2 shadow-sm">
                    <button className="p-4 hover:bg-sariblack/8 rounded-2xl"><Paperclip size={18} /></button>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} placeholder="Ketik pesan untuk Sahabat Sanubari..." className="outline-0 w-full text-sm" />
                    <button className="p-4 hover:bg-sariblack/8 rounded-2xl"><Mic size={20} /></button>
                    <button onClick={sendMessage} className="p-4 bg-sarired text-white rounded-2xl"><Send size={18} /></button>
                </div>

                <p className="text-[10px] text-center text-gray-400 leading-tight shrink-0">
                    Sahabat Sanubari adalah asisten informasi, bukan pengganti diagnosa medis profesional.<br />Dalam keadaan darurat, segera hubungi layanan medis setempat.
                </p>
            </div>

            <div className={`fixed top-1/2 -translate-y-1/2 right-0 z-50 transition-all duration-500 ease-in-out flex items-center ${showSummary ? "translate-x-0" : "translate-x-[calc(100%-110px)]"}`}>
                <button onClick={() => setShowSummary(!showSummary)} className={`bg-white border border-gray-200 shadow-xl py-4 px-2 flex items-center transition-all duration-500 rounded-l-2xl ${showSummary ? "border-r-0 rounded-r-none gap-2" : "gap-5 hover:pr-8"}`}>
                    <ChevronLeft size={24} className={`text-[#333] transition-transform duration-500 ${showSummary ? "rotate-180" : ""}`}/>
                    <div className={`transition-all duration-500 overflow-hidden flex items-center ${showSummary ? "w-0 opacity-0 invisible" : "w-[52px] opacity-100 visible"}`}>
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.4446 1.92411C25.2451 0.93385 26.7549 0.933849 27.5554 1.92411L31.2078 6.44242C31.7051 7.05769 32.5185 7.32195 33.2825 7.11652L38.8931 5.60797C40.1228 5.27735 41.3442 6.16477 41.4098 7.43643L41.7088 13.2386C41.7496 14.0288 42.2522 14.7206 42.9911 15.0035L48.4169 17.0809C49.6061 17.5362 50.0726 18.9721 49.3782 20.0394L46.2097 24.9093C45.7782 25.5724 45.7782 26.4276 46.2097 27.0907L49.3782 31.9606C50.0726 33.0279 49.6061 34.4638 48.4169 34.9191L42.9911 36.9965C42.2522 37.2794 41.7496 37.9712 41.7088 38.7614L41.4098 44.5636C41.3442 45.8352 40.1228 46.7226 38.8931 46.392L33.2825 44.8835C32.5185 44.6781 31.7051 44.9423 31.2078 45.5576L27.5554 50.0759C26.7549 51.0661 25.2451 51.0662 24.4446 50.0759L20.7922 45.5576C20.2949 44.9423 19.4816 44.6781 18.7175 44.8835L13.1069 46.392C11.8772 46.7226 10.6558 45.8352 10.5902 44.5636L10.2912 38.7614C10.2504 37.9712 9.74778 37.2794 9.00893 36.9965L3.58311 34.9191C2.39395 34.4638 1.9274 33.0279 2.62184 31.9606L5.79034 27.0907C6.2218 26.4276 6.2218 25.5724 5.79034 24.9093L2.62184 20.0394C1.9274 18.9721 2.39395 17.5362 3.58311 17.0809L9.00893 15.0035C9.74778 14.7206 10.2504 14.0288 10.2912 13.2386L10.5902 7.43643C10.6558 6.16477 11.8772 5.27735 13.1069 5.60797L18.7175 7.11652C19.4815 7.32195 20.2949 7.05769 20.7922 6.44242L24.4446 1.92411Z" fill="#FF5267"/>
                            <path d="M25.5 36C24.95 36 24.4792 35.8042 24.0875 35.4125C23.6958 35.0208 23.5 34.55 23.5 34H27.5C27.5 34.55 27.3042 35.0208 26.9125 35.4125C26.5208 35.8042 26.05 36 25.5 36V36M21.5 33V31H29.5V33H21.5V33M21.75 30C20.6 29.3167 19.6875 28.4 19.0125 27.25C18.3375 26.1 18 24.85 18 23.5C18 21.4167 18.7292 19.6458 20.1875 18.1875C21.6458 16.7292 23.4167 16 25.5 16C27.5833 16 29.3542 16.7292 30.8125 18.1875C32.2708 19.6458 33 21.4167 33 23.5C33 24.85 32.6625 26.1 31.9875 27.25C31.3125 28.4 30.4 29.3167 29.25 30H21.75V30" fill="white"/>
                        </svg>
                    </div>
                </button>

                <div className={`w-[320px] h-[450px] bg-white border border-gray-200 border-l-0 shadow-2xl rounded-3xl p-5 transition-all duration-500 ease-in-out flex flex-col gap-4 ${showSummary ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
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