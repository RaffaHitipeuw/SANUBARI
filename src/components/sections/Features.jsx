import { Bot, TextSearch, TrendingUp } from "lucide-react";
import { Badges, FeatureBg, HealthTrends, MedicalAiAst, RealTimeTrack } from "./Assets";
import { useEffect, useRef } from "react";

export default function Features(){
    const bgRef = useRef(null);
    useEffect(() => {
        let animationFrame;
        let position = 0;
        let bgHeight = 0;
        let isMobile = window.innerWidth < 640;
        const SPEED = isMobile ? 1.5 : 2;
        const SCALE = isMobile ? 1.5 : 1.25;
        const animate = () => {
            position -= SPEED;
            if(bgRef.current){
                const firstBg = bgRef.current.children[0];
                if(firstBg && bgHeight === 0){
                    bgHeight = firstBg.offsetHeight;
                } if(bgHeight > 0 && Math.abs(position) >= bgHeight * 4){
                    position = 0;
                }
                bgRef.current.style.transform =
                    `translateY(${position}px) scale(${SCALE})`;
            }
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        const handleResize = () => {
            isMobile = window.innerWidth < 640;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <section id="features" className="py-30 max-sm:py-4 max-sm:px-4 relative overflow-hidden flex flex-col items-center justify-center gap-12 bg-sariwhite rounded-b-[64px] z-2">
            <div className="chip-title text-center items-center">
                <span className="chip text-sariblue">Fitur Kami</span>
                <h1 className="heading-1">Esensial-mu<br className="hidden max-sm:inline" /> Jadi Satu</h1>
            </div>
            <div className="flex max-sm:flex-col gap-4">
                <div className="relative overflow-hidden card bg-saribluelight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <TextSearch className="absolute text-sariblue size-10 max-sm:size-9"/>
                        <Badges type={'rtt'} className='w-26 max-sm:w-24 text-black/5'/>
                    </span>
                    <div className="card-desc">
                        <h1>Real-time Tracking</h1>
                        <p className="text-base/[145%] max-sm:text-sm text-sarigray">Pantau perubahan detak jantung Anda secara langsung dengan teknologi sensor kamera termutakhir.</p>
                    </div>
                    <RealTimeTrack className={'absolute -top-10 -right-5 w-50 h-auto'}/>
                </div>
                <div className="relative overflow-hidden card bg-sariyellowlight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <Bot className="absolute text-sariyellow size-10 max-sm:size-9"/>
                        <Badges type={'maa'} className='w-26 max-sm:w-24 text-black/5'/>
                    </span>
                    <div className="card-desc">
                        <h1>Medical AI Assistant</h1>
                        <p className="text-base/[145%] max-sm:text-sm text-sarigray">Dapatkan ringkasan kesehatan cerdas dan saran gaya hidup dari asisten AI medis kami.</p>
                    </div>
                    <MedicalAiAst className={'absolute -top-30 -right-45 w-90 h-auto'}/>
                </div>
                <div className="relative overflow-hidden card bg-sariredlight">
                    <span className="-top-3 -left-3 flex items-center justify-center relative">
                        <TrendingUp className="absolute text-sarired size-10 max-sm:size-9"/>
                        <Badges type={'ht'} className='w-26 max-sm:w-24 text-sarired/20'/>
                    </span>
                    <div className="card-desc">
                        <h1>Health Trends</h1>
                        <p className="text-base/[145%] max-sm:text-sm text-sarigray">Lihat perkembangan kesehatan Anda melalui grafik visual yang mudah dipahami setiap minggunya.</p>
                    </div>
                    <HealthTrends className={'absolute -top-10 -right-10 w-50 h-auto text-sarired'}/>
                </div>
            </div>
            <div className="absolute inset-0 overflow-hidden -z-1">
                <div ref={bgRef} className="absolute inset-0 will-change-transform">
                    <FeatureBg className='absolute top-0 left-0 w-full h-[140%] max-sm:h-[200%] scale-125' />
                    <FeatureBg className='absolute top-[160%] max-sm:top-[180%] left-0 w-full h-[140%] max-sm:h-[200%] scale-125' />
                    <FeatureBg className='absolute top-[320%] max-sm:top-[360%] left-0 w-full h-[140%] max-sm:h-[200%] scale-125' />
                    <FeatureBg className='absolute top-[480%] max-sm:top-[540%] left-0 w-full h-[140%] max-sm:h-[200%] scale-125' />
                </div>

            </div>
        </section>
    )
}