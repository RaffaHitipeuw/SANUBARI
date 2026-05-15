import { ArrowRight, Download, PersonStanding } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function InsightPage() {
    return (
        <div className="w-full grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-12 px-6 py-2 flex gap-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold font-mr text-sariblack">Insight Kesehatan Anda</h1>
                    <p className="text-sarigray text-base font-int">Pantau perkembangan ritme jantung dan analisis kebugaran harian Anda untuk hidup yang lebih sehat.</p>
                </div>
                <span className="block h-full w-px bg-sariblack/14"></span>
                <button className="flex items-center gap-2 py-3 px-6 rounded-2xl bg-sariwhite border border-sariblack/14"><Download size={18}/> Download PDF Laporan</button>
            </div>

            {/* INI BUAT YANG DATA INSIGHT! JAN BIKIN SECTION BARU! RAPA! */}
            <div className="dsh-cards border-sariblack/14 col-span-12 h-[80vh]"></div>

            {/* INI CARD REKOMEN YANG DIGENERATE AI */}
            <div className="dsh-cards flex flex-col gap-4 border-sariblack/14 col-span-8">
                <div className="flex items-center gap-4">
                    <span className="bg-sarired text-white uppercase px-3 py-1 rounded-lg">Harian</span>
                    <h1 className="text-2xl font-mr font-semibold">Rekomendasi Aktivitas</h1>
                </div>
                <p className="text-base text-sarigray">Berdasarkan pemulihan jantung Anda semalam, hari ini adalah waktu yang tepat untuk meningkatkan mobilitas ringan.</p>
                <div className="h-full w-full bg-sarired/14 border-l-8 border-sarired p-6 gap-6 flex">
                    {/* SIZE WAJIB 18PX, BILANG KE AI */}
                    <PersonStanding className="shrink-0" size={56}/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quod similique assumenda, praesentium ut optio quo fuga accusamus culpa. Quasi ut facere, commodi ad eum veritatis. Aut nesciunt asperiores obcaecati.</p>
                </div>
            </div>
            <NavLink to={'/dashboard/blog'} className="h-[52vh] flex flex-col rounded-3xl border bg-white border-sariblack/14 col-span-4 row-span-1 overflow-clip relative">
                <img src="/src/assets/images/testimonial-user.png" alt="" className="w-full h-50 object-cover" />
                <span className="absolute top-6 right-6 bg-sariredlight text-sarired font-bold px-3 py-1 rounded-lg text-sm">NEW ARTICLE</span>
                <div className="flex flex-col gap-2 p-6 h-full">
                    <h1 className="text-2xl font-mr font-semibold">5 Tips Jantung Sehat di Usia 30-an</h1>
                    <h2 className="text-sm text-sarigray">Read by 2,400+ users today</h2>
                </div>
                <div className="flex justify-between p-6">
                    <p>8 Oktober 2026</p>
                    <p className="flex gap-2 rounded-2xl" to={'/dashboard'}>Selengkapnya <ArrowRight size={18} /></p>
                </div>
            </NavLink>
        </div>
    );
}
