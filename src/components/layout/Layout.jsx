import { Link, Outlet } from "react-router";
import { Logo, LogoText } from "../sections/Assets";

export default function Layout() {
    return(
        <>
            <main>
                <Outlet/>
            </main>

            <footer className="grid grid-cols-12 max-sm:grid-cols-1 px-32 max-sm:px-8 py-12 max-sm:py-8 bg-saribluelight rounded-t-[64px] max-sm:rounded-t-4xl gap-6">
                <div className="col-span-8 max-sm:col-span-1 flex flex-col gap-4 max-sm:gap-8">
                    <LogoText className={'text-sariblue w-48 h-auto'}/>
                    <h1 className="font-mr text-[32px]/[130%] max-sm:text-2xl/[130%] font-semibold">
                        Pantau kesehatan cepat untuk hidup lebih panjang dan sehat. <b>Setiap detak berarti.</b>
                    </h1>
                    <p className="text-base/[145%]">helpsanubari@gmail.com</p>
                </div>

                <nav className="col-span-2 max-sm:col-span-1 flex flex-col gap-4">
                    <h2 className="font-mr text-base font-semibold text-sariblue">Eksplor</h2>
                    <Link to={'#tentang'} className="text-2xl max-sm:text-lg font-mr font-semibold">Tentang</Link>
                    <Link to={'#testimoni'} className="text-2xl max-sm:text-lg font-mr font-semibold">Testimoni</Link>
                    <Link to={'#fitur'} className="text-2xl max-sm:text-lg font-mr font-semibold">Fitur</Link>
                    <Link to={'#faq'} className="text-2xl max-sm:text-lg font-mr font-semibold">FAQ</Link>
                </nav>

                <nav className="col-span-2 max-sm:col-span-1 flex flex-col gap-4">
                    <h2 className="font-mr text-base font-semibold text-sariblue">Terhubung</h2>
                    <Link to={'#tentang'} className="text-2xl max-sm:text-lg font-mr font-semibold">Tentang</Link>
                    <Link to={'#testimoni'} className="text-2xl max-sm:text-lg font-mr font-semibold">Testimoni</Link>
                    <Link to={'#fitur'} className="text-2xl max-sm:text-lg font-mr font-semibold">Fitur</Link>
                    <Link to={'#faq'} className="text-2xl max-sm:text-lg font-mr font-semibold">FAQ</Link>
                </nav>
            </footer>
        </>
    )
}