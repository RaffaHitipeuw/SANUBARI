import { RealTimeTrack } from "./Assets";

export default function About() {
    return(
        <section className="grid grid-cols-5 max-sm:grid-cols-2 justify-items-center items-center px-40 max-sm:px-6 py-32 max-sm:pb-12 max-sm:pt-30 -mt-16 gap-y-26 max-sm:gap-y-0 gap-x-6 max-sm:gap-x-0 bg-saribluelight relative overflow-hidden rounded-b-[64px] max-sm:rounded-b-4xl">
            <span className="z-2 chip col-span-2 max-sm:col-span-1 text-sariwhite max-sm:text-xs">Tentang Kami</span>
            <div className="z-2 card-small">
                <h1 className="text-sariblue h-full align-middle">5</h1>
                <h2 className="opacity-80 max-sm:text-xs">
                    <b>Program Kesehatan</b><br />
                    berhasil dilakukan oleh <span className="font-mr font-semibold">SANUBARI</span>
                </h2>
            </div>
            <div className="z-2 card-small">
                <h1 className="text-sariblue h-full align-middle">1</h1>
                <h2 className="opacity-80 max-sm:text-xs">
                    <b>Bulan Berdiri</b><br />
                    semenjak <span className="font-mr font-semibold">SANUBARI</span> official launching
                </h2>
            </div>
            <div className="z-2 card-small">
                <h1 className="text-sariblue h-full align-middle">200+</h1>
                <h2 className="opacity-80 max-sm:text-xs">
                    <b>Unit Kesehatan</b><br />
                    telah terbantu oleh sistem <span className="font-mr font-semibold">SANUBARI</span>
                </h2>
            </div>
            <h2 className="z-2 col-span-5 max-sm:col-span-2 text-[32px] max-sm:text-xl px-32 max-sm:px-0 max-sm:mt-16">
                <span className="font-mr font-semibold">SANUBARI</span> adalah platform kesehatan preventif berbasis web yang mampu mendeteksi detak jantung secara real-time hanya dengan kamera device, tanpa alat tambahan.
            </h2>
            <RealTimeTrack className={'-top-70 max-sm:-top-100 -left-30 absolute w-140 h-auto'}/>
            <RealTimeTrack className={'-bottom-70 max-sm:-bottom-120 -right-60 absolute w-140 h-auto'}/>
        </section>
    )
}