import { Link, Outlet } from "react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { Logo, LogoText } from "../sections/Assets";

export default function Layout() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
    return(
        <>
            <main>
                <Outlet/>
            </main>
            <footer className="grid grid-cols-12 px-32 py-12 bg-saribluelight rounded-t-[64px] gap-6">
                <div className="col-span-8 flex flex-col gap-4">
                    <LogoText className={'text-sariblue w-48 h-auto'}/>
                    <h1 className="font-mr text-[32px]/[130%] font-semibold">Pantau kesehatan cepat untuk hidup lebih panjang dan sehat. <b>Setiap detak berarti.</b></h1>
                    <p className="text-base/[145%]">helpsanubari@gmail.com</p>
                </div>
                <nav className="col-span-2 flex flex-col gap-4">
                    <h2 className="font-mr text-base font-semibold text-sariblue">Eksplor</h2>
                    <Link to={'#tentang'} className="text-2xl font-mr font-semibold">Tentang</Link>
                    <Link to={'#testimoni'} className="text-2xl font-mr font-semibold">Testimoni</Link>
                    <Link to={'#fitur'} className="text-2xl font-mr font-semibold">Fitur</Link>
                    <Link to={'#faq'} className="text-2xl font-mr font-semibold">FAQ</Link>
                </nav>
                <nav className="col-span-2 flex flex-col gap-4">
                    <h2 className="font-mr text-base font-semibold text-sariblue">Terhubung</h2>
                    <Link to={'#tentang'} className="text-2xl font-mr font-semibold">Tentang</Link>
                    <Link to={'#testimoni'} className="text-2xl font-mr font-semibold">Testimoni</Link>
                    <Link to={'#fitur'} className="text-2xl font-mr font-semibold">Fitur</Link>
                    <Link to={'#faq'} className="text-2xl font-mr font-semibold">FAQ</Link>
                </nav>
            </footer>
        </>
    )
}