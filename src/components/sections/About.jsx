import { RealTimeTrack } from "./Assets";

export default function About() {
    return(
        <section className="grid grid-cols-5 px-40 py-32 -mt-16 gap-y-26 gap-x-6 bg-saribluelight relative overflow-hidden rounded-b-[64px]">
            <span className="z-2 chip col-span-2 text-sariwhite">Tentang Kami</span>
            <div className="z-2 card-small">
                <h1 className="text-sariblue h-full align-middle">5</h1>
                <h2 className="opacity-80">
                    <b>Program Kesehatan</b><br />
                    berhasil dilakukan oleh <span className="font-mr font-semibold">SANUBARI</span>
                </h2>
            </div>
            <div className="z-2 card-small">
                <h1 className="text-sariblue h-full align-middle">1</h1>
                <h2 className="opacity-80">
                    <b>Bulan Berdiri</b><br />
                    semenjak <span className="font-mr font-semibold">SANUBARI</span> official launching
                </h2>
            </div>
            <div className="z-2 card-small">
                <h1 className="text-sariblue h-full align-middle">200+</h1>
                <h2 className="opacity-80">
                    <b>Unit Kesehatan</b><br />
                    telah terbantu oleh sistem <span className="font-mr font-semibold">SANUBARI</span>
                </h2>
            </div>
            <h2 className="z-2 col-span-5 text-[32px] px-32">
                <span className="font-mr font-semibold">SANUBARI</span> adalah platform kesehatan preventif berbasis web yang mampu mendeteksi detak jantung secara real-time hanya dengan kamera device, tanpa alat tambahan.
            </h2>
            <RealTimeTrack className={'-top-70 -left-30 absolute w-140 h-auto'}/>
            <RealTimeTrack className={'-bottom-70 -right-60 absolute w-140 h-auto'}/>
        </section>
    )
}