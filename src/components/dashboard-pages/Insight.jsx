import { ArrowRight, Download, PersonStanding } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function InsightPage() {

    const [recommendation, setRecommendation] = useState("");

    useEffect(() => {

        async function fetchRecommendation() {

            try {
                const saved = localStorage.getItem(
                    "dailyRecommendation"
                );

                if (saved) {
                    const parsed = JSON.parse(saved);
                    const today = new Date().toDateString();
                    if (parsed.date === today) {
                        setRecommendation(
                            parsed.recommendation
                        );
                        return;
                    }
                }

                const response = await fetch(
                    "http://127.0.0.1:5000/daily-recommendation"
                );

                const data = await response.json();
                localStorage.setItem(
                    "dailyRecommendation",
                    JSON.stringify({
                        date: new Date().toDateString(),
                        recommendation: data.recommendation
                    })
                );
                setRecommendation(
                    data.recommendation
                );

            } catch (error) {
                console.error(error);
            }
        }
        fetchRecommendation();

    }, []);
    return (
        <div className="w-full grid grid-cols-12 max-sm:grid-cols-1 gap-4 mt-2 max-sm:mt-2">
            {/* HEADING */}
            <div className="col-span-12 max-sm:col-span-1 px-6 max-sm:px-0 py-2 max-sm:py-0 flex max-sm:flex-col gap-4 justify-between items-center">
                <div className="flex flex-col gap-2 max-sm:gap-1 max-sm:px-4">
                    <h1 className="text-4xl max-sm:text-2xl font-semibold font-mr text-sariblack">Insight Kesehatan Anda</h1>
                    <p className="text-sarigray text-base max-sm:text-sm">Pantau perkembangan ritme jantung dan analisis kebugaran harian Anda untuk hidup yang lebih sehat.</p>
                </div>
                <span className="block max-sm:hidden h-full w-px bg-sariblack/14"></span>
                <button className="flex items-center max-sm:justify-center gap-2 py-3 px-6 rounded-2xl bg-sariwhite border border-sariblack/14 cursor-pointer hover:bg-sariblack/8 max-sm:w-full">
                    <Download size={18}/> Download PDF Laporan
                </button>
            </div>

            {/* CHART SECTION */}
            <div className="bg-white dsh-cards border border-sariblack/14 col-span-12 max-sm:col-span-1 h-[80vh] p-8 flex flex-col">
                <div className="flex max-sm:flex-col items-start justify-between gap-6 max-sm:gap-4">
                    <div className="flex flex-col gap-2 max-sm:gap-1">
                        <h1 className="text-4xl max-sm:text-2xl leading-none font-mr font-semibold text-sariblack">
                            Tren Detak Jantung
                        </h1>
                        <p className="text-sarigray text-base max-sm:text-sm">
                            Rata-rata mingguan (30 hari terakhir)
                        </p>
                    </div>

                    <div className="bg-sariblue/14 rounded-2xl max-sm:w-full p-2 flex items-center">
                        <button className="cursor-pointer max-sm:w-full px-4 py-2 rounded-xl bg-sariblue text-white text-sm font-semibold">
                            30 Hari
                        </button>
                        <button className="cursor-pointer max-sm:w-full px-4 py-2 rounded-xl text-sariblue text-sm font-semibold">
                            90 Hari
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center mt-6">
                    <div className="w-full h-full flex flex-col justify-end">
                        <div className="flex w-full h-full">
                            {/* Y-AXIS */}
                            <div className="w-10 h-full flex flex-col justify-between pr-3">
                                <span className="text-xs text-sariblack/35 font-int">100</span>
                                <span className="text-xs text-sariblack/35 font-int">80</span>
                                <span className="text-xs text-sariblack/35 font-int">60</span>
                                <span className="text-xs text-sariblack/35 font-int">40</span>
                            </div>

                            {/* EMPTY CHART AREA */}
                            <div className="relative flex-1 border-b border-sariblack/10 flex items-center justify-center">
                                <p className="text-gray-200 font-semibold font-mr tracking-wide">No Recent Activity</p>
                            </div>
                        </div>

                        {/* LEGEND */}
                        <div className="flex items-center gap-6 max-sm:gap-4 mt-6 max-sm:mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-sariblue" />
                                <p className="text-sariblack/60 text-xs w-max">
                                    Resting Heart Rate:<br className="hidden max-sm:inline"/> -- bpm
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-full">
                                <div className="w-3 h-3 rounded-full bg-[#FF5B77]" />
                                <p className="text-sariblack/60 text-xs">
                                    Status: <br className="hidden max-sm:inline"/>--
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* REKOMENDASI AI SECTION */}
            <div className="bg-white dsh-cards flex flex-col gap-4 border-sariblack/14 col-span-8 max-sm:col-span-1">
                <div className="flex max-sm:flex-col items-center max-sm:items-start gap-4">
                    <span className="bg-sarired font-bold tracking-wider text-white uppercase px-4 py-1 rounded-full text-sm max-sm:text-xs">Harian</span>
                    <h1 className="text-2xl max-sm:text-xl font-mr font-semibold">Rekomendasi Aktivitas</h1>
                </div>
                <p className="text-base max-sm:text-sm text-sarigray">Berdasarkan pemulihan jantung Anda semalam, hari ini adalah waktu yang tepat untuk meningkatkan mobilitas ringan.</p>
                <div className="h-full w-full bg-sariredlight border-l-8 border-sarired p-6 max-sm:p-4 gap-6 max-sm:gap-4 flex text-sarired rounded-r-2xl max-sm:rounded-r-lg">
                    <PersonStanding className="shrink-0 size-12 max-sm:size-8"/>
                    <p className="font-bold text-base max-sm:text-sm">{recommendation}</p>
                </div>
            </div>

            {/* ARTIKEL CARD */}
            <Link to={'/dashboard/blog'} className="h-[52vh] max-sm:h-max flex flex-col rounded-3xl max-sm:rounded-2xl border bg-white border-sariblack/14 col-span-4 max-sm:col-span-1 row-span-1 overflow-clip relative">
                <img src="/assets/images/testimonial-user.png" alt="" className="w-full h-50 object-cover" />
                <span className="absolute top-4 left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider px-3 py-1 rounded-lg text-sm max-sm:text-xs uppercase">REKOMENDASI ARTIKEL</span>
                <div className="flex flex-col gap-2 p-6 max-sm:p-4 h-full">
                    <h1 className="text-2xl max-sm:text-xl font-mr font-semibold">5 Tips Jantung Sehat di Usia 30-an</h1>
                    <h2 className="text-sm text-sarigray">Dibaca oleh 2,400+ pengguna hari ini</h2>
                </div>
                <div className="flex justify-between items-center p-6 max-sm:p-4">
                    <p className="text-sm max-sm:text-xs">8 Oktober 2026</p>
                    <p className="flex items-center gap-2 rounded-2xl text-sm">Selengkapnya <ArrowRight size={18} /></p>
                </div>
            </Link>
        </div>
    );
}
