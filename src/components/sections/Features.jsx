import { Bot, TextSearch, TrendingUp } from "lucide-react";
import { Badges, FeatureBg } from "./Assets";

export default function Features(){
    return(
        <section className="h-screen relative overflow-hidden items-center justify-center flex flex-col gap-12">
            <div className="chip-title text-center">
                <span className="chip text-sariblue">Fitur</span>
                <h1 className="heading-1">Esensial-mu Jadi Satu</h1>
            </div>
            <div className="flex gap-4">
                <div className="card bg-saribluelight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <TextSearch className="absolute text-sariblue" size={'40px'}/>
                        <Badges type={'rtt'} className='w-26 text-black/5'/>
                    </span>
                    <div className="card-desc">
                        <h1>Real-time Tracking</h1>
                        <p>Pantau perubahan detak jantung Anda secara langsung dengan teknologi sensor kamera termutakhir.</p>
                    </div>
                </div>
                <div className="card bg-sariyellowlight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <Bot className="absolute text-sariyellow" size={'40px'}/>
                        <Badges type={'maa'} className='w-26 text-black/5'/>
                    </span>
                    <div className="card-desc">
                        <h1>Medical AI Assistant</h1>
                        <p>Dapatkan ringkasan kesehatan cerdas dan saran gaya hidup dari asisten AI medis kami.</p>
                    </div>
                </div>
                <div className="card bg-sariredlight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <TrendingUp className="absolute text-sarired" size={'40px'}/>
                        <Badges type={'ht'} className='w-26 text-sarired/20'/>
                    </span>
                    <div className="card-desc">
                        <h1>Health Trends</h1>
                        <p>Lihat perkembangan kesehatan Anda melalui grafik visual yang mudah dipahami setiap minggunya.</p>
                    </div>
                </div>
            </div>
            <FeatureBg className='absolute w-full h-full scale-125 -z-1'/>
        </section>
    )
}