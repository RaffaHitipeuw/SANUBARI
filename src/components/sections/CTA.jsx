import { Badges } from "./Assets";
import { useNavigate } from "react-router";

export default function CTA() {
    
    const navigate = useNavigate();

    return(
        <section className="h-screen max-sm:h-[120vh] flex items-center justify-center relative px-40">
            <span className="w-full h-full absolute flex justify-center items-center">
                <Badges type={'rtt'} className={'z-3 top-[20%] max-sm:top-[3%] left-[14%] max-sm:left-[4%] absolute text-[#ADE1DD] w-26 max-sm:w-18 h-auto '} />
                <Badges type={'maa'} className={'bottom-[36%] max-sm:bottom-[65%] left-[34%] max-sm:left-[40%] absolute text-sariyellowlight w-26 max-sm:w-18 h-auto '} />
                <Badges type={'ht'} className={'top-[24%] max-sm:top-[72%] right-[16%] absolute text-sariredlight w-26 max-sm:w-18 h-auto '} />
            </span>
            <button onClick={() => navigate('/login')} className="relative top-[-6%] max-sm:top-[8%] right-[-10%] z-4 bg-white px-18 max-sm:px-12 py-4 text-2xl max-sm:text-base whitespace-nowrap rounded-3xl max-sm:rounded-2xl border border-sariblack cursor-pointer hover:scale-105 transition-all duration-112">Daftar Sekarang!</button>
            <span className="w-full h-full absolute flex justify-center items-center">
                <h1 className="top-[24%] max-sm:top-[8%] left-[18%] max-sm:left-[16%] absolute font-mr tracking-tighter text-8xl max-sm:text-[64px] font-semibold">Praktis,</h1>
                <h1 className="bottom-[30%] max-sm:bottom-0 max-sm:top-[30%] left-[30%] absolute font-mr tracking-tighter text-8xl max-sm:text-[64px] font-semibold">Mudah,</h1>
                <h1 className="top-[16%] max-sm:top-[70%] right-[18%] max-sm:right-[30%] absolute font-mr tracking-tighter text-8xl max-sm:text-[64px] font-semibold">Gratis.</h1>
            </span>
        </section>
    )
}