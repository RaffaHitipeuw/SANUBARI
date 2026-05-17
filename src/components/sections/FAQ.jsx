import Accordion from "../accordion/Accordion";

export default function FAQ() {
    return(
        <section className="grid grid-cols-12 max-sm:grid-cols-1 px-40 max-sm:px-4 gap-6 max-sm:gap-8 py-20">
            <div className="chip-title text-left max-sm:text-center col-span-3 max-sm:col-span-1 justify-start max-sm:items-center">
                <span className="chip text-sariblue">FAQ</span>
                <h1 className="heading-1">Masih <br className="hidden max-sm:inline" />Bingung?</h1>
            </div>
            <div className="flex flex-col col-span-9 max-sm:col-span-1 gap-6">
                <Accordion title={<>Apakah hasil pemeriksaan bisa langsung <br />  dipahami oleh pengguna awam?</>} content={"Sanubari menggunakan teknologi Remote Photoplethysmography (rPPG) yang membaca perubahan warna mikro pada wajah. Data tersebut kemudian diolah dengan AI dan signal processing untuk menghasilkan estimasi BPM (Beat Per Minute)."} arrowBadge={'maa'} arrowPosition={'right'} />
                <Accordion title={'Bagaimana cara Sanubari mendeteksi detak jantung?'} content={"Ya. Sanubari dilengkapi dengan AI Health Assistant yang menyajikan hasil pemeriksaan secara sederhana, edukatif, dan mudah dimengerti oleh pelajar maupun masyarakat umum."} arrowBadge={'rtt'} arrowPosition={'left'} />
                <Accordion title={<>Apa keunggulan utama Sanubari dibandingkan <br /> alat monitoring kesehatan lain?</>} content={"Keunggulan Sanubari adalah akses mudah, biaya rendah, dan tanpa alat tambahan. Cukup dengan webcam laptop, pengguna bisa melakukan screening kesehatan awal secara contactless, sekaligus mendapatkan edukasi kesehatan preventif."} arrowBadge={'ht'} arrowPosition={'right'} />
            </div>
        </section>
    )
}