import {
    BriefcaseMedical,
    Heart,
    Info,
    Lightbulb,
    Mic,
    Paperclip,
    Send,
    Utensils
} from "lucide-react";

import React, {
    useEffect,
    useRef,
    useState
} from 'react'

export default function ChatbotPage() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [infoChat, setInfoChat] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);

    const sendMessage = async (customMessage = null) => {

        const finalMessage = customMessage || message;

        if (!finalMessage.trim()) return;

        const userMessage = {
            role: "user",
            text: finalMessage,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        setMessages(prev => [...prev, userMessage]);

        setMessage("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: finalMessage
                    })
                }
            );

            const data = await response.json();

            const botMessage = {
                role: "bot",
                text: data.response,
                time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {

            console.log(error);

            const errorMessage = {
                role: "bot",
                text: "Maaf, terjadi kesalahan saat menghubungi SariAI.",
                time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            setMessages(prev => [...prev, errorMessage]);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="w-full grid grid-cols-12 grid-rows-[auto_1fr_auto] gap-4 h-full chatpage">
            <div className="relative bg-white col-span-12 px-6 py-4 flex justify-between items-center border rounded-3xl border-sariblack/14">

                <span className="flex gap-4 items-center">

                    <img
                        src="/src/assets/images/sari-profile.png"
                        alt=""
                        className="w-14 aspect-square object-cover rounded-full border-3 p-1 border-sariblue"
                    />

                    <span>
                        <h2 className="text-xl font-mr font-semibold">
                            SariAI
                        </h2>

                        <h3 className="text-sm text-sarigray">
                            Konsultan AI Kesehatan Jantung
                        </h3>
                    </span>

                </span>

                <button
                    onClick={() => setInfoChat(!infoChat)}
                    className={`absolute top-4 right-6 flex items-center justify-center rounded-2xl text-sariblack/40 cursor-pointer z-999 p-4 ${
                        infoChat
                            ? 'w-66 bg-white dsh-cards flex-col gap-4'
                            : 'hover:bg-sariblack/8'
                    }`}
                >

                    <Info
                        size={infoChat ? 56 : 20}
                        className={infoChat && 'text-sarired'}
                    />

                    <p className={infoChat ? 'block text-sm' : 'hidden'}>
                        SariAI adalah generatif AI kami sebagai sarana konsultasi instan.
                    </p>

                    <p className={infoChat ? 'block text-sm' : 'hidden'}>
                        SariAI adalah asisten informasi, bukan pengganti diagnosa medis profesional.
                    </p>

                    <p className={infoChat ? 'block text-sm' : 'hidden'}>
                        <b>
                            Dalam keadaan darurat, segera hubungi layanan medis setempat.
                        </b>
                    </p>

                </button>

            </div>
            <div className="relative col-span-8 px-6 py-2 flex flex-col overflow-auto">

                <div className="flex flex-col gap-6 pb-20">

                    {messages.length === 0 && (

                        <div className="flex flex-col gap-2">

                            <p className="bubble-chat botinput">
                                Halo! Saya SariAI 👋
                                Saya di sini untuk membantu Anda memahami kesehatan jantung Anda.
                                Apa yang ingin Anda tanyakan hari ini?
                            </p>

                            <span className="text-xs">
                                {new Date().toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>

                        </div>

                    )}

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex flex-col ${
                                msg.role === "user"
                                    ? "items-end"
                                    : ""
                            }`}
                        >

                            <div className="flex flex-col gap-2">

                                <p
                                    className={`bubble-chat ${
                                        msg.role === "user"
                                            ? "userinput"
                                            : "botinput"
                                    }`}
                                >
                                    {msg.text}
                                </p>

                                <span className="text-xs">
                                    {msg.time}
                                </span>

                            </div>

                        </div>

                    ))}

                    {loading && (

                        <div className="flex flex-col gap-2">

                            <p className="bubble-chat botinput">
                                Sari sedang mengetik...
                            </p>

                        </div>

                    )}

                    <div ref={bottomRef} />

                </div>
                <span className="flex gap-4 w-full *:transition-colors *:duration-100 absolute left-0 bottom-0 overflow-auto py-2 bg-[#F9F9F5]">

                    <button
                        onClick={() => sendMessage("Apa itu detak jantung normal?")}
                        className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full"
                    >
                        <Heart size={18}/>
                        Apa itu detak jantung normal?
                    </button>

                    <button
                        onClick={() => sendMessage("Tips diet rendah kolesterol")}
                        className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full"
                    >
                        <Utensils size={18}/>
                        Tips diet rendah kolesterol
                    </button>

                    <button
                        onClick={() => sendMessage("Kapan saya harus ke dokter?")}
                        className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full"
                    >
                        <BriefcaseMedical size={18}/>
                        Kapan saya harus ke dokter?
                    </button>

                </span>

            </div>
            <div className="bg-white col-span-4 px-6 py-2 flex flex-col gap-6 dsh-cards border-sariblack/14 overflow-auto">

                <h1 className="text-2xl font-semibold font-mr text-sariblack">
                    Ringkasan Hari Ini
                </h1>

                <div className="relative flex flex-col gap-4 p-6 border border-sariblack/14 rounded-2xl">

                    <Heart
                        size={20}
                        className="text-sarired absolute top-6 right-6"
                    />

                    <h1 className="uppercase text-xl">
                        BPM Terakhir
                    </h1>

                    <p className="text-5xl font-bold flex items-end gap-2">
                        72
                        <span className="text-base font-normal">
                            BPM
                        </span>
                    </p>

                    <span className="block h-4 bg-sariblack/14 rounded-full overflow-clip">

                        <span className="block h-4 bg-sariblue w-[72%]"></span>

                    </span>

                    <p className="text-sariblue font-bold text-lg">
                        Normal
                    </p>

                </div>

                <div className="bg-sarired p-6 rounded-2xl flex flex-col gap-2 items-start text-white">

                    <span className="block bg-sariwhite/20 p-4 rounded-2xl">

                        <Lightbulb
                            size={20}
                            className="text-white"
                        />

                    </span>

                    <h2 className="text-xl font-mr font-semibold mt-4">
                        Saran SariAI
                    </h2>

                    <p className="text-white">
                        Berdasarkan data Anda, detak jantung Anda meningkat 5% hari ini.
                        Cobalah meditasi 5 menit.
                    </p>

                </div>

            </div>
            <div className="col-span-12 px-12 py-2 flex flex-col gap-6">

                <span className="flex gap-2 items-center w-full relative bg-white border border-sariblack/14 rounded-3xl p-2">

                    <button className="cursor-pointer p-4 hover:bg-sariblack/8 rounded-2xl">

                        <Paperclip size={18}/>

                    </button>

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Tanyakan sesuatu kepada SariAI..."
                        className="outline-0 caret-sarired text-base text-sariblack placeholder:text-sariblack/40 w-full"
                    />

                    <button className="cursor-pointer p-4 hover:bg-sariblack/8 rounded-2xl">

                        <Mic size={20}/>

                    </button>

                    <button
                        onClick={sendMessage}
                        className="cursor-pointer p-4 bg-sarired text-white hover:bg-sarired/60 rounded-2xl"
                    >

                        <Send size={18}/>

                    </button>

                </span>

                <p className="text-sm text-center text-sariblack/40">

                    <b>
                        SariAI adalah asisten informasi, bukan pengganti diagnosa medis profesional.
                    </b>

                    {" "}Dalam keadaan darurat, segera hubungi layanan medis setempat.

                </p>

            </div>

        </div>
    );
}