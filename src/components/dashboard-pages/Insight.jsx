import { ArrowRight, Download, PersonStanding } from "lucide-react";
import { Link } from "react-router";

export default function InsightPage() {
    return (
        <div className="w-full grid grid-cols-12 gap-4 mt-2">
            {/* HEADING */}
            <div className="col-span-12 px-6 py-2 flex gap-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold font-mr text-sariblack">Insight Kesehatan Anda</h1>
                    <p className="text-sarigray text-base font-int">Pantau perkembangan ritme jantung dan analisis kebugaran harian Anda untuk hidup yang lebih sehat.</p>
                </div>
                <span className="block h-full w-px bg-sariblack/14"></span>
                <button className="flex items-center gap-2 py-3 px-6 rounded-2xl bg-sariwhite border border-sariblack/14 cursor-pointer hover:bg-sariblack/8"><Download size={18}/> Download PDF Laporan</button>
            </div>

            {/* INI BUAT YANG DATA INSIGHT! JAN BIKIN SECTION BARU! RAPA! */}
            <div className="bg-white dsh-cards border border-sariblack/14 col-span-12 h-[80vh] p-8 flex flex-col">
            <div className="flex items-start justify-between">
        
                <div>
                    <h1 className="text-[2rem] leading-none font-mr font-semibold text-sariblack">
                        Tren Detak Jantung
                    </h1>
            
                    <p className="text-sariblack/50 mt-1 font-int">
                        Rata-rata mingguan (30 hari terakhir)
                    </p>
                </div>

                <div className="bg-[#F5F5F5] rounded-2xl p-1 flex items-center gap-1">
            
                    <button className="px-4 py-2 rounded-xl bg-[#A8D5CF] text-white text-sm font-semibold font-int">
                        30 Hari
                    </button>
            
                    <button className="px-4 py-2 rounded-xl text-[#A8D5CF] text-sm font-semibold font-int">
                        90 Hari
                    </button>
            
                </div>
            
            </div>

            <div className="flex-1 flex items-center justify-center mt-10">
                <div className="w-full h-full flex flex-col justify-end">
                    <div className="flex w-full h-[70%]">
                        <div className="w-10 h-full flex flex-col justify-between pb-8 pr-3">
            
                            <span className="text-xs text-sariblack/35 font-int">
                                100
                            </span>
            
                            <span className="text-xs text-sariblack/35 font-int">
                                80
                            </span>
            
                            <span className="text-xs text-sariblack/35 font-int">
                                60
                            </span>
            
                            <span className="text-xs text-sariblack/35 font-int">
                                40
                            </span>
            
                        </div>
                        <div className="relative flex-1 border-b border-sariblack/10 flex items-end">
                            <div className="flex-1 flex flex-col items-center justify-end h-full relative">
            
                                <div className="w-full bg-saribluelight border-t-4 border-sariblue rounded-t-md h-[68%]" />
            
                                <p className="mt-3 text-sm text-sariblack/40 font-int">
                                    Minggu 1
                                </p>
            
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-end h-full relative">
            
                                <div className="w-full bg-saribluelight border-t-4 border-sariblue rounded-t-md h-[78%]" />
            
                                <p className="mt-3 text-sm text-sariblack/40 font-int">
                                    Minggu 2
                                </p>
            
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-end h-full relative">
                                <div className="w-full bg-saribluelight border-t-4 border-sariblue rounded-t-md h-[74%]" />
            
                                <p className="mt-3 text-sm text-sariblue font-int">
                                    Minggu 3
                                </p>
            
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-end h-full relative">
            
                                <div className="w-full bg-saribluelight border-t-4 border-sariblue rounded-t-md h-[70%]" />
            
                                <p className="mt-3 text-sm text-sariblack/40 font-int">
                                    Minggu 4
                                </p>
            
                            </div>
            
                        </div>
            
                    </div>
                    <div className="flex items-center gap-8 mt-8">
            
                        <div className="flex items-center gap-2">
            
                            <div className="w-3 h-3 rounded-full bg-sariblue" />
            
                            <p className="text-sariblack/60 font-int text-sm">
                                Resting Heart Rate: 64 bpm
                            </p>
            
                        </div>
            
                        <div className="flex items-center gap-2">
            
                            <div className="w-3 h-3 rounded-full bg-[#FF5B77]" />
            
                            <p className="text-sariblack/60 font-int text-sm">
                                Status: Optimal
                            </p>
            
                        </div>
            
                    </div>
            
                </div>
            
            </div>
            
        </div>

            {/* INI CARD REKOMEN YANG DIGENERATE AI */}
            <div className="bg-white dsh-cards flex flex-col gap-4 border-sariblack/14 col-span-8">
                <div className="flex items-center gap-4">
                    <span className="bg-sarired font-bold tracking-wider text-white uppercase px-4 py-1 rounded-full">Harian</span>
                    <h1 className="text-2xl font-mr font-semibold">Rekomendasi Aktivitas</h1>
                </div>
                <p className="text-base text-sarigray">Berdasarkan pemulihan jantung Anda semalam, hari ini adalah waktu yang tepat untuk meningkatkan mobilitas ringan.</p>
                <div className="h-full w-full bg-sariredlight border-l-8 border-sarired p-6 gap-6 flex text-sarired rounded-r-2xl">
                    {/* SIZE WAJIB 18PX, BILANG KE AI */}
                    <PersonStanding className="shrink-0" size={48}/>
                    <p className="font-bold">Anda perlu jalan kaki 15 menit lebih lama hari ini untuk meningkatkan kekuatan detak jantung Anda.</p>
                </div>
            </div>

            {/* ARTIKEL CARD */}
            <Link to={'/dashboard/blog'} className="h-[52vh] flex flex-col rounded-3xl border bg-white border-sariblack/14 col-span-4 row-span-1 overflow-clip relative">
                <img src="/src/assets/images/testimonial-user.png" alt="" className="w-full h-50 object-cover" />
                <span className="absolute top-4 left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider px-3 py-1 rounded-lg text-sm uppercase">REKOMENDASI ARTIKEL</span>
                <div className="flex flex-col gap-2 p-6 h-full">
                    <h1 className="text-2xl font-mr font-semibold">5 Tips Jantung Sehat di Usia 30-an</h1>
                    <h2 className="text-sm text-sarigray">Dibaca oleh 2,400+ pengguna hari ini</h2>
                </div>
                <div className="flex justify-between p-6">
                    <p>8 Oktober 2026</p>
                    <p className="flex items-center gap-2 rounded-2xl">Selengkapnya <ArrowRight size={18} /></p>
                </div>
            </Link>
        </div>
    );
}
