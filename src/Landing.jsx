import { ArrowRight } from 'lucide-react';
import HeartCard from './HeartCard';
import WeeklyChart from './WeeklyChart';
import FaceScanner from './FaceScanner';

const svgPath = `
M668.584 4.5H697.907C828.219 4.50001 933.863 110.201 933.863 240.596V252.332C933.863 376.244 833.471 476.691 709.637 476.691H645.125C551.945 476.691 476.411 552.272 476.411 645.5C476.411 738.728 551.945 814.31 645.125 814.31H721.361C851.67 814.31 957.31 920.01 957.311 1050.4C957.311 1180.8 851.667 1286.5 721.355 1286.5H674.438C570.038 1286.5 485.4 1201.82 485.399 1097.35C485.399 987.918 396.738 899.2 287.362 899.2H240.45C110.141 899.2 4.50006 793.502 4.5 663.11V651.368C4.50001 527.456 104.892 427.009 228.726 427.009H246.32C365.413 427.009 461.952 330.41 461.952 211.255C461.952 97.065 554.467 4.5 668.584 4.5Z
M942.966 594.942L942.963 594.859C941.636 558.624 954.061 523.326 977.532 496.435L978.658 495.16C1002.83 468.153 1036.35 452.111 1071.9 450.483C1094.14 450.865 1115.9 457.275 1134.99 469.076C1148.64 477.515 1166.81 481.575 1184.68 481.575C1202.56 481.575 1220.73 477.515 1234.38 469.076C1253.47 457.275 1275.23 450.865 1297.47 450.483C1333.02 452.111 1366.53 468.154 1390.7 495.16C1414.9 522.206 1427.75 558.048 1426.4 594.859L1426.4 594.942V595.024C1426.4 641.648 1402.53 690.964 1367.89 737.848C1333.32 784.631 1288.45 828.425 1247.4 863.905L1247.4 863.908C1229.81 879.131 1207.61 887.464 1184.68 887.464C1161.76 887.464 1139.55 879.132 1121.97 863.908L1121.97 863.905C1080.91 828.425 1036.05 784.631 1001.48 737.848C966.839 690.965 942.966 641.649 942.966 595.024V594.942Z
`;

function Landing() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Excerpts */}
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <h1 className="heading-1 text-sariblack">
          Monitor Detak Jantung Anda<br/>
          <span className="font-bold text-sarired">Secara Instan</span>
        </h1>
        <p className='w-120'>Gunakan kamera Anda untuk deteksi cepat. Gratis, Aman, dan Akurat. Pantau kesehatan jantung Anda kapan saja, di mana saja dengan presisi tinggi.</p>
      </div>
      {/* Animation */}
      <div className="-z-1 relative flex items-center justify-center w-full h-90">
        <div className="translate-y-[-30%] z-2 translate-x-[15%] absolute">
          <HeartCard />
        </div>
        <div className="translate-y-[10%] z-3 scale-45 translate-x-[50%] absolute">
          <WeeklyChart />
        </div>
        <div className="translate-y-6 translate-x-[-55%] absolute">
          <FaceScanner />
        </div>
      </div>
      {/* Button Container */}
      <div className="flex gap-4 mt-2">
        <button className="main-btn border border-sariblue text-sariblue">
          Pelajari Lebih Lanjut
        </button>
        <button className="main-btn flex items-center gap-2 bg-sarired text-sariwhite">
          Mulai Sekarang <ArrowRight size={18} />
        </button>
      </div>
      {/* BG LINE */}
      <svg className="-z-10 absolute top-0 w-[105%] opacity-10 pointer-events-none h-auto"
        viewBox="0 250 1431 900">
        <path d={svgPath} stroke="#FF7252" strokeWidth="9" fill="none" />
      </svg>
    </section>
  );
}

export default Landing;