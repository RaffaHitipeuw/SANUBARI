import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router";

export default function Blog() {

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const blogs = [
        {
            title: "Rahasia Diet Mediterania: Mengapa Jantung Anda Sangat Menyukainya",
            description: "Penelitian terbaru mengonfirmasi bahwa pola makan ala Mediterania mampu menurunkan risiko penyakit jantung...",
            category: "Nutrisi & Diet",
            image: "/assets/images/rahasiadiet.png",
            author: "Dr. Tirta Kencana",
            readTime: "5 Menit Baca",
            featured: true
        },

        {
            title: "Yoga untuk Kontrol Tekanan Darah Tinggi",
            description: "Gerakan yoga yang tepat dikombinasikan dengan teknik pernapasan pranayama terbukti membantu menjaga tekanan darah tetap stabil.",
            category: "Olahraga",
            image: "/assets/images/yoga.png",
            date: "8 Oktober 2026"
        },

        {
            title: "5 Kebiasaan Pagi yang Merusak Jantung",
            description: "Dari langsung memeriksa email hingga melewatkan sarapan, kenali kebiasaan rutin yang diam-diam membebani kesehatan jantung.",
            category: "Gaya Hidup",
            image: "/assets/images/kerusakan.png",
            date: "8 Oktober 2026"
        },

        {
            title: "Meditasi 10 Menit untuk Menurunkan Stres",
            description: "Kesehatan mental memiliki pengaruh besar terhadap ritme jantung. Teknik meditasi sederhana ini dapat membantu tubuh lebih rileks.",
            category: "Kesehatan Mental",
            image: "/assets/images/kardio.png",
            date: "8 Oktober 2026"
        },

        {
            title: "Kapan Waktu Terbaik untuk Kardio?",
            description: "Pagi hari saat perut kosong atau sore hari setelah beraktivitas? Temukan waktu terbaik untuk latihan kardio Anda.",
            category: "Olahraga",
            image: "/assets/images/kardio.png",
            date: "8 Oktober 2026"
        }
    ];

    const categories = [
        "Semua",
        "Nutrisi & Diet",
        "Olahraga",
        "Gaya Hidup",
        "Kesehatan Mental"
    ];

    const featuredBlog = blogs.find(
        (blog) => blog.featured
    );

    const filteredBlogs = useMemo(() => {

        return blogs.filter((blog) => {
            if (blog.featured) {
                return false;
            }

            const matchCategory =
                activeCategory === "Semua"
                    ? true
                    : blog.category === activeCategory;

            const matchSearch =
                blog.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return matchCategory && matchSearch;

        });

    }, [search, activeCategory]);

    return (
        <div className="w-full grid grid-cols-12 max-sm:grid-cols-1 gap-4 mt-2">
            <div className="col-span-12 max-sm:col-span-1 px-6 py-2 max-sm:p-0 flex flex-col gap-6 items-center justify-center text-center">
                <div className="flex flex-col gap-2 max-sm:px-4">
                    <h1 className="text-4xl max-sm:text-2xl font-semibold font-mr text-sariblack">
                        Edukasi Jantung Sehat
                    </h1>
                    <p className="text-sarigray text-base max-sm:text-sm font-int">
                        Panduan medis terpercaya untuk menjaga detak jantung Anda tetap kuat dan hidup lebih berkualitas.
                    </p>
                </div>
                <span className="flex items-center w-full relative">
                    <Search
                        size={18}
                        className="absolute left-6"
                    />
                    <input
                        type="text"
                        placeholder="Cari Artikel Kesehatan"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-base text-sariblack placeholder:text-sariblack/40 w-full pl-16.5 pr-6 py-4 bg-white border border-sariblack/14 rounded-3xl"
                    />
                </span>
                <span className="flex gap-4 max-sm:gap-2 w-full overflow-auto *:transition-colors *:duration-100" style={{scrollbarWidth: "none"}}>
                    {categories.map((category) => (
                        <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 px-6 py-2 h-max rounded-full border cursor-pointer text-sm ${activeCategory === category ? "bg-sarired text-white border-sarired" : "bg-white text-sariblack border-sariblack/14 hover:bg-sarired hover:text-white"}`}>
                            {category}
                        </button>
                    ))}
                </span>
            </div>
            {
                activeCategory === "Semua" &&
                search.trim() === "" && (
                    <div className="rounded-3xl max-sm:rounded-2xl border overflow-hidden col-span-12 max-sm:col-span-1 h-[90vh] max-sm:h-max relative bg-white border-sariblack/14 flex max-sm:flex-col">
                        <img
                            src={featuredBlog.image}
                            alt=""
                            className="w-1/2 max-sm:w-full h-full object-cover object-center shrink-0"
                        />
                        <span className="absolute top-6 max-sm:top-4 left-6 max-sm:left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider uppercase px-4 py-2 rounded-full text-sm max-sm:text-xs">
                            Pilihan Redaksi
                        </span>
                        <div className="flex flex-col gap-6 max-sm:gap-4 p-20 max-sm:p-4 w-full justify-center">
                            <span className="uppercase text-sarired text-base max-sm:text-sm tracking-widest">
                                — {featuredBlog.category}
                            </span>
                            <h1 className="text-4xl/[145%] max-sm:text-xl font-semibold font-mr text-sariblack">
                                {featuredBlog.title}
                            </h1>
                            <p className="text-base/[145%] max-sm:text-sm text-sarigray">
                                {featuredBlog.description}
                            </p>
                            <span className="flex gap-4 items-center">
                                <img
                                    src="/assets/images/testimonial-user.png"
                                    alt=""
                                    className="w-14 max-sm:w-12"
                                />
                                <span>
                                    <h2 className="text-base max-sm:text-sm font-semibold">
                                        {featuredBlog.author}
                                    </h2>
                                    <h3 className="text-sm max-sm:text-xs text-sarigray">
                                        Kardiologis • {featuredBlog.readTime}
                                    </h3>
                                </span>
                            </span>
                            <Link
                                className="flex items-center max-sm:w-full max-sm:justify-center gap-2 rounded-2xl"
                                to={"/dashboard"}
                            >
                                Selengkapnya <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                )
            }
            {filteredBlogs.map((blog, index) => (
                <Link
                    key={index}
                    to={"/dashboard/blog"}
                    className="flex flex-col rounded-3xl max-sm:rounded-2xl border bg-white border-sariblack/14 col-span-4 max-sm:col-span-1 row-span-1 overflow-clip relative"
                >
                    <img
                        src={blog.image}
                        alt=""
                        className="w-full h-50 object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-sariwhite border border-sariblack/14 text-sariblack font-bold tracking-wider px-3 py-1 rounded-lg text-sm uppercase">
                        {blog.category}
                    </span>
                    <div className="flex flex-col gap-6 max-sm:gap-4 p-6 max-sm:p-4 h-full">
                        <h1 className="text-2xl max-sm:text-xl font-mr font-semibold">
                            {blog.title}
                        </h1>
                        <h2 className="text-base text-sarigray line-clamp-3">
                            {blog.description}
                        </h2>
                    </div>
                    <div className="flex justify-between items-center p-6 max-sm:p-4">
                        <p className="text-sm max-sm:text-xs">{blog.date}</p>
                        <p className="flex items-center gap-2 rounded-2xl text-sm">Selengkapnya <ArrowRight size={18} /></p>
                    </div>
                </Link>
            ))}
            {filteredBlogs.length === 0 && (
                <div className="col-span-12 max-sm:col-span-1 bg-white rounded-3xl border border-sariblack/14 p-20 text-center">
                    <h1 className="text-3xl font-semibold font-mr text-sariblack">
                        Artikel Tidak Ditemukan
                    </h1>
                    <p className="text-sarigray mt-2">
                        Coba gunakan kata kunci lain.
                    </p>
                </div>
            )}
            <div className="col-span-12 max-sm:col-span-1 flex justify-center mb-2">
                <button className="flex items-center gap-2 py-3 px-6 rounded-2xl bg-sarired cursor-pointer hover:bg-white border border-transparent hover:border-sariblack/14 text-white hover:text-sarired">
                    <ArrowDown size={18} />
                    Muat Lebih Banyak
                </button>
            </div>
        </div>
    );
}