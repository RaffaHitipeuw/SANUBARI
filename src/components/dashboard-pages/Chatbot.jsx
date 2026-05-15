import { BriefcaseMedical, Heart, Info, Lightbulb, Mic, Paperclip, Send, Utensils } from "lucide-react";

export default function ChatbotPage() {
    return (
        <div className="w-full grid grid-cols-12 grid-rows-[auto_1fr_auto] gap-4 h-full chatpage">
            <div className="bg-white col-span-12 px-6 py-4 flex justify-between items-center border rounded-3xl border-sariblack/14">
                <span className="flex gap-4 items-center">
                    <img src="/src/assets/images/testimonial-user.png" alt="" className="w-14 aspect-square object-cover" />
                    <span>
                        <h2 className="text-xl font-mr font-semibold">SariAI</h2>
                        <h3 className="text-sm text-sarigray">Konsultan AI Kesehatan Jantung</h3>
                    </span>
                </span>
                <button className="aspect-square flex items-center justify-center rounded-2xl text-sariblack/40 cursor-pointer p-4 hover:bg-sariblack/8">
                    <Info size={20}/>
                </button>
            </div>
            <div className="relative col-span-8 px-6 py-2 flex flex-col gap-6 overflow-auto">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-2">
                        <p className="bubble-chat botinput">Halo! Saya Sari! Saya di sini untuk membantu Anda memahami kesehatan jantung Anda. Apa yang ingin Anda tanyakan hari ini?</p>
                        <span className="text-xs">06.20 AM</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col gap-2 items-end">
                        <p className="bubble-chat userinput">Saya sering merasa berdebar-debar setelah minum kopi. Apakah itu normal?</p>
                        <span className="text-xs">06.20 AM</span>
                    </div>
                </div>
                <span className="flex gap-4 w-full *:transition-colors *:duration-100 absolute left-0 bottom-0 overflow-auto">
                    <span className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full"><Heart size={18}/>Apa itu detak jantung normal?</span>
                    <span className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full"><Utensils size={18}/>Tips diet rendah kolesterol</span>
                    <span className="flex items-center gap-2 text-sm bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-4 py-2 rounded-full"><BriefcaseMedical size={18}/>Kapan saya harus ke dokter?</span>
                </span>
            </div>
            <div className="bg-white col-span-4 px-6 py-2 flex flex-col gap-6 dsh-cards border-sariblack/14 overflow-auto">
                <h1 className="text-2xl font-semibold font-mr text-sariblack">Ringkasan Hari Ini</h1>
                <div className="relative flex flex-col gap-4 p-6 border border-sariblack/14 rounded-2xl">
                    <Heart size={20} className="text-sarired absolute top-6 right-6"/>
                    <h1 className="uppercase text-xl">BPM Terakhir</h1>
                    <p className="text-5xl font-bold flex items-end gap-2">72<span className="text-base font-normal">BPM</span></p>
                    <span className="block h-4 bg-sariblack/14 rounded-full overflow-clip">
                        <span className="block h-4 bg-sariblue w-[72%]"></span>
                    </span>
                    <p className="text-sariblue font-bold text-lg">Normal</p>
                </div>
                <div className="bg-sarired p-6 rounded-2xl flex flex-col gap-2 items-start text-white">
                    <span className="block bg-sariwhite/20 p-4 rounded-2xl">
                        <Lightbulb size={20} className="text-white"/>
                    </span>
                    <h2 className="text-xl font-mr font-semibold mt-4">Saran SariAI</h2>
                    <p className="text-white">Berdasarkan data Anda, detak jantung Anda meningkat 5% hari ini. Cobalah meditasi 5 menit.</p>
                </div>
            </div>
            <div className="col-span-12 px-12 py-2 flex flex-col gap-6">
                <span className="flex gap-2 items-center w-full relative bg-white border border-sariblack/14 rounded-3xl p-2">
                    <button className="cursor-pointer p-4 hover:bg-sariblack/8 rounded-2xl">
                        <Paperclip size={18}/>
                    </button>
                    <input type="text" placeholder="Cari Artikel Kesehatan" className="outline-0 caret-sarired text-base text-sariblack placeholder:text-sariblack/40 w-full" />
                    <button className="cursor-pointer p-4 hover:bg-sariblack/8 rounded-2xl">
                        <Mic size={20}/>
                    </button>
                    <button className="cursor-pointer p-4 bg-sarired text-white hover:bg-sarired/60 rounded-2xl">
                        <Send size={18}/>
                    </button>
                </span>
                <p className="text-sm text-center text-sariblack/40"><b>SariAI adalah asisten informasi, bukan pengganti diagnosa medis profesional.</b> Dalam keadaan darurat, segera hubungi layanan medis setempat.</p>
            </div>
        </div>
    );
}
