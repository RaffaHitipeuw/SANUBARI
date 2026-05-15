import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router";

export default function Blog() {
    return (
        <div className="w-full grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-12 px-6 py-2 flex flex-col gap-6 items-center justify-center text-center">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold font-mr text-sariblack">Edukasi Jantung Sehat</h1>
                    <p className="text-sarigray text-base font-int">Panduan medis terpercaya untuk menjaga detak jantung Anda tetap kuat dan hidup lebih berkualitas.</p>
                </div>
                <span className="flex items-center w-full relative">
                    <Search size={18} className="absolute left-6"/>
                    <input type="text" placeholder="Cari Artikel Kesehatan" className="text-base text-sariblack w-full pl-16.5 pr-6 py-4 bg-white border border-sariblack/14 rounded-3xl" />
                </span>
                <span className="flex gap-4 w-full *:transition-colors *:duration-100">
                    <span className="bg-sarired cursor-pointer hover:bg-sarired text-white px-6 py-2 rounded-full">Semua</span>
                    <span className="bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-6 py-2 rounded-full">Nutrisi & Diet</span>
                    <span className="bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-6 py-2 rounded-full">Olahraga</span>
                    <span className="bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-6 py-2 rounded-full">Gaya Hidup</span>
                    <span className="bg-white cursor-pointer text-sariblack hover:text-white border border-sariblack/14 hover:bg-sarired px-6 py-2 rounded-full">Kesehatan Mental</span>
                </span>
            </div>
            <div className="dsh-cards col-span-12 h-[90vh] relative bg-white border-sariblack/14 flex">
                <img src="/src/assets/images/testimonial-user.png" alt="" className="w-1/2 object-cover object-center shrink-0"/>
                <span className="absolute top-6 left-6 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider uppercase px-4 py-2 rounded-full">Pilihan Redaksi</span>
                <div className="flex flex-col gap-6 p-20 w-full justify-center">
                    <span className="uppercase text-sarired text-base tracking-widest">— Nutrisi & Diet</span>
                    <h1 className="text-4xl/[145%] font-semibold font-mr text-sariblack">Rahasia Diet Mediterania: Mengapa Jantung Anda Sangat Menyukainya</h1>
                    <p className="text-base/[145%] text-sarigray">Penelitian terbaru mengonfirmasi bahwa pola makan ala Mediterania mampu menurunkan risiko penyakit jantung...</p>
                    <span className="flex gap-4 items-center">
                        <img src="/src/assets/images/testimonial-user.png" alt="" className="w-14" />
                        <span>
                            <h2 className="text-base font-semibold">Dr. Tirta Kencana</h2>
                            <h3 className="text-sm text-sarigray">Kardiologis • 5 Menit Baca</h3>
                        </span>
                    </span>
                    <Link className="flex items-center gap-2 rounded-2xl" to={'/dashboard'}>Selengkapnya <ArrowRight size={18} /></Link>
                </div>
            </div>
            {/* ↓ INI BISA DIBIKIN MODEL API ↓ */}
            <Link to={'/dashboard/blog'} className="flex flex-col rounded-3xl border bg-white border-sariblack/14 col-span-4 row-span-1 overflow-clip relative">
                <img src="/src/assets/images/testimonial-user.png" alt="" className="w-full h-50 object-cover" />
                <span className="absolute top-4 left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider px-3 py-1 rounded-lg text-sm uppercase">Olahraga</span>
                <div className="flex flex-col gap-6 p-6 h-full">
                    <h1 className="text-2xl font-mr font-semibold">Yoga untuk Kontrol Tekanan Darah Tinggi</h1>
                    <h2 className="text-base text-sarigray line-clamp-3">Gerakan yoga yang tepat dikombinasikan dengan teknik pernapasan pranayama terbukti…</h2>
                </div>
                <div className="flex justify-between p-6">
                    <p>8 Oktober 2026</p>
                    <p className="flex items-center gap-2 rounded-2xl">Selengkapnya <ArrowRight size={18} /></p>
                </div>
            </Link>
            <Link to={'/dashboard/blog'} className="flex flex-col rounded-3xl border bg-white border-sariblack/14 col-span-4 row-span-1 overflow-clip relative">
                <img src="/src/assets/images/testimonial-user.png" alt="" className="w-full h-50 object-cover" />
                <span className="absolute top-4 left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider px-3 py-1 rounded-lg text-sm uppercase">Gaya Hidup</span>
                <div className="flex flex-col gap-6 p-6 h-full">
                    <h1 className="text-2xl font-mr font-semibold">5 Kebiasaan Pagi yang Merusak Jantung</h1>
                    <h2 className="text-base text-sarigray line-clamp-3">Dari langsung memeriksa email hingga melewatkan sarapan, kenali kebiasaan rutin yang diam...</h2>
                </div>
                <div className="flex justify-between p-6">
                    <p>8 Oktober 2026</p>
                    <p className="flex items-center gap-2 rounded-2xl">Selengkapnya <ArrowRight size={18} /></p>
                </div>
            </Link>
            <Link to={'/dashboard/blog'} className="flex flex-col rounded-3xl border bg-white border-sariblack/14 col-span-4 row-span-1 overflow-clip relative">
                <img src="/src/assets/images/testimonial-user.png" alt="" className="w-full h-50 object-cover" />
                <span className="absolute top-4 left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider px-3 py-1 rounded-lg text-sm uppercase">Olahraga</span>
                <div className="flex flex-col gap-6 p-6 h-full">
                    <h1 className="text-2xl font-mr font-semibold">Kapan Waktu Terbaik untuk Kardio?</h1>
                    <h2 className="text-base text-sarigray line-clamp-3">Pagi hari saat perut kosong atau sore hari setelah beraktivitas? Temukan jawabannya…</h2>
                </div>
                <div className="flex justify-between p-6">
                    <p>8 Oktober 2026</p>
                    <p className="flex items-center gap-2 rounded-2xl">Selengkapnya <ArrowRight size={18} /></p>
                </div>
            </Link>
        </div>
    );
}
