import { Bot, TextSearch, TrendingUp } from "lucide-react";
import { Badges, FeatureBg } from "./Assets";

export default function Features(){
    return(
        <section className="py-30 max-sm:py-4 max-sm:px-4 relative overflow-hidden flex flex-col items-center justify-center gap-12 bg-sariwhite rounded-b-[64px] z-2">
            <div className="chip-title text-center items-center">
                <span className="chip text-sariblue">Fitur</span>
                <h1 className="heading-1">Esensial-mu<br className="hidden max-sm:inline" /> Jadi Satu</h1>
            </div>
            <div className="flex max-sm:flex-col gap-6 max-sm:gap-4">
                <div className="card bg-saribluelight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <TextSearch className="absolute text-sariblue size-10 max-sm:size-9"/>
                        <Badges type={'rtt'} className='w-26 max-sm:w-24 text-black/5'/>
                    </span>
                    <div className="card-desc">
                        <h1>Real-time Tracking</h1>
                        <p className="text-base/[145%] max-sm:text-sm text-sarigray">Pantau perubahan detak jantung Anda secara langsung dengan teknologi sensor kamera termutakhir.</p>
                    </div>
                </div>
                <div className="card bg-sariyellowlight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <Bot className="absolute text-sariyellow size-10 max-sm:size-9"/>
                        <Badges type={'maa'} className='w-26 max-sm:w-24 text-black/5'/>
                    </span>
                    <div className="card-desc">
                        <h1>Medical AI Assistant</h1>
                        <p className="text-base/[145%] max-sm:text-sm text-sarigray">Dapatkan ringkasan kesehatan cerdas dan saran gaya hidup dari asisten AI medis kami.</p>
                    </div>
                </div>
                <div className="card bg-sariredlight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <TrendingUp className="absolute text-sarired size-10 max-sm:size-9"/>
                        <Badges type={'ht'} className='w-26 max-sm:w-24 text-sarired/20'/>
                    </span>
                    <div className="card-desc">
                        <h1>Health Trends</h1>
                        <p className="text-base/[145%] max-sm:text-sm text-sarigray">Lihat perkembangan kesehatan Anda melalui grafik visual yang mudah dipahami setiap minggunya.</p>
                    </div>
                </div>
            </div>
            <FeatureBg className='absolute w-full h-full scale-125 -z-1'/>
        </section>
    )
}