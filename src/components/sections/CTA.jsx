import { Badges } from "./Assets";

export default function CTA() {
    return(
        <section className="h-[90vh] flex items-center justify-center relative px-40">
            <span className="w-full h-full absolute flex justify-center items-center">
                <Badges type={'rtt'} className={'z-3 top-[20%] left-[14%] absolute text-sariblue w-26'} />
                <Badges type={'maa'} className={'bottom-[36%] left-[34%] absolute text-sariyellowlight w-26'} />
                <Badges type={'ht'} className={'top-[24%] right-[16%] absolute text-sariredlight w-26'} />
            </span>
            <button className="relative top-[-6%] right-[-10%] z-4 bg-sariwhite px-18 py-6 text-2xl rounded-3xl border border-sariblack cursor-pointer hover:scale-105 transition-all duration-112">Daftar Sekarang!</button>
            <span className="w-full h-full absolute flex justify-center items-center">
                <h1 className="top-[24%] left-[18%] absolute font-mr tracking-tighter text-[96px] font-semibold">Praktis,</h1>
                <h1 className="bottom-[30%] left-[30%] absolute font-mr tracking-tighter text-[96px] font-semibold">Mudah,</h1>
                <h1 className="top-[16%] right-[18%] absolute font-mr tracking-tighter text-[96px] font-semibold">Gratis.</h1>
            </span>
        </section>
    )
}