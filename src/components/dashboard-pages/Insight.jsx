export default function InsightPage() {
    return (
        <div className="w-full grid grid-cols-12 gap-4">
            <div className="col-span-12 px-6 py-2 flex flex-col gap-1">
                <h1 className="text-4xl font-semibold font-mr text-sariblack">Insight Kesehatan Anda</h1>
                <p className="text-sarigray text-lg font-int">Pantau perkembangan ritme jantung dan analisis kebugaran harian Anda untuk hidup yang lebih sehat.</p>
            </div>
            <div className="dsh-cards border-sariblack/14 col-span-12 h-[80vh]"></div>
            <div className="dsh-cards border-sariblack/14 col-span-9 h-[60vh]"></div>
            <div className="dsh-cards border-sariblack/14 col-span-3"></div>
        </div>
    );
}
