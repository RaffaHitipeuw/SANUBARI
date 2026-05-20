import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, provider } from "../../firebase-config.js";
import { Badges } from "../components/sections/Assets";

export default function SignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      console.log("Berhasil daftar:", userCredential.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="w-screen h-screen max-sm:h-max max-sm:py-10 overflow-hidden bg-[#F9F9F5] flex font-sans max-sm:overflow-auto">
      <div className="relative hidden lg:flex w-[64vw] h-full items-center justify-center overflow-hidden border-r border-[#ECEAE6]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="400 -550 1431 2000"
          fill="#F1F1ED"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M668.584 4.5H697.907C828.219 4.50001 933.863 110.201 933.863 240.596V252.332C933.863 376.244 833.471 476.691 709.637 476.691H645.125C551.945 476.691 476.411 552.272 476.411 645.5C476.411 738.728 551.945 814.31 645.125 814.31H721.361C851.67 814.31 957.31 920.01 957.311 1050.4C957.311 1180.8 851.667 1286.5 721.355 1286.5H674.438C570.038 1286.5 485.4 1201.82 485.399 1097.35C485.399 987.918 396.738 899.2 287.362 899.2H240.45C110.141 899.2 4.50006 793.502 4.5 663.11V651.368C4.50001 527.456 104.892 427.009 228.726 427.009H246.32C365.413 427.009 461.952 330.41 461.952 211.255C461.952 97.065 554.467 4.5 668.584 4.5ZM942.966 594.942L942.963 594.859C941.636 558.624 954.061 523.326 977.532 496.435L978.658 495.16C1002.83 468.153 1036.35 452.111 1071.9 450.483C1094.14 450.865 1115.9 457.275 1134.99 469.076C1148.64 477.515 1166.81 481.575 1184.68 481.575C1202.56 481.575 1220.73 477.515 1234.38 469.076C1253.47 457.275 1275.23 450.865 1297.47 450.483C1333.02 452.111 1366.53 468.154 1390.7 495.16C1414.9 522.206 1427.75 558.048 1426.4 594.859L1426.4 594.942V595.024C1426.4 641.648 1402.53 690.964 1367.89 737.848C1333.32 784.631 1288.45 828.425 1247.4 863.905L1247.4 863.908C1229.81 879.131 1207.61 887.464 1184.68 887.464C1161.76 887.464 1139.55 879.132 1121.97 863.908L1121.97 863.905C1080.91 828.425 1036.05 784.631 1001.48 737.848C966.839 690.965 942.966 641.649 942.966 595.024V594.942Z" />
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-[6vw] leading-none font-mr font-black tracking-[-0.06em] text-[#191C1E]">
            SANUBARI
          </h1>

          <p className="mt-[1.5vh] max-w-[28vw] text-[#6B6D6F] text-[1.05vw] leading-[1.8]">
            Pemantauan kesehatan canggih untuk hidup lebih
            <br />
            panjang dan sehat. Setiap detak berarti.
          </p>

          <div className="mt-[6.5vh] w-[16vw] min-w-[290px] bg-white rounded-[18px] px-[1.4vw] py-[1.3vw] shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-[0.55vw]">
              <div className="w-[0.22vw] min-w-[3px] h-[1.2vw] min-h-[18px] rounded-full bg-[#FF7252]" />
              <span className="text-[1.15vw] min-text-[16px] font-bold text-sariblack/80">
                72 BPM
              </span>
            </div>

            <div className="mt-[1.8vw] h-[4vw] min-h-[70px] flex items-end gap-[0.35vw]">
              <div className="h-[12%] w-full rounded-[1px] bg-[#FFD6CC]" />
              <div className="h-[24%] w-full rounded-[1px] bg-[#FFC2B2]" />
              <div className="h-[52%] w-full rounded-[1px] bg-[#FF977D]" />
              <div className="h-[76%] w-full rounded-[1px] bg-[#FF7252]" />
              <div className="h-[44%] w-full rounded-[1px] bg-[#FF8D73]" />
              <div className="h-[18%] w-full rounded-[1px] bg-[#FFB4A3]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-sm:w-full w-[40vw] h-full bg-white flex items-center justify-center">
        <div className="w-full max-w-106 px-8">
          <div>
            <h2 className="text-[32px] font-mr font-bold tracking-tighter text-[#232527] leading-none">
              Selamat Datang!
            </h2>
            <p className="mt-3 text-base text-sariblack/80 font-medium">
              Mari bergabung bersama SANUBARI.
            </p>
          </div>

          <form onSubmit={handleSignup} className="mt-12">
            <div>
              <label className="block mb-2 text-xs font-medium text-sariblack/80">
                Nama Lengkap
              </label>
              <div className="h-14 bg-sariwhite rounded-2xl px-4 flex items-center border border-transparent focus-within:border-sariblue transition-all">
                <input
                  type="text"
                  placeholder="Muhammad Rafir"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-sariblack placeholder:text-sariblack/60"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-xs font-medium text-sariblack/80">
                Email
              </label>
              <div className="h-14 bg-sariwhite rounded-2xl px-4 flex items-center border border-transparent focus-within:border-sariblue transition-all">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-sariblack placeholder:text-sariblack/60"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-sariblack/80">
                  Password
                </label>
              </div>
              <div className="h-14 bg-sariwhite rounded-2xl px-4 flex items-center border border-transparent focus-within:border-sariblue transition-all">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-[14px] text-sariblack placeholder:text-sariblack/60"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 accent-sariblue"
              />
              <span className="text-xs text-sariblack/80 font-medium">
                Remember Me
              </span>
            </div>

            <span className="mt-6 flex max-sm:flex-col gap-2 max-sm:items-center">
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-sariblue hover:brightness-95 transition-all text-white text-base font-semibold font-mr flex items-center justify-center gap-3 shadow-[0_12px_25px_rgba(145,198,194,0.28)]"
              >
                Buat Akun
                <span className="text-[22px] leading-none">→</span>
              </button>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="h-14 max-sm:w-max px-5 rounded-2xl border-2 border-sariblue flex items-center justify-center hover:bg-sariblue/5 transition-all"
              >
                <Badges type={'google'} className={'w-6 h-auto'} />
              </button>
            </span>
          </form>

          <div className="mt-7 text-center text-xs text-sariblack/80 font-medium">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-bold text-sariblue"
            >
              Login
            </button>
          </div>

          <div className="mt-20 mb-10 max-sm:mb-0 text-center">
            <p className="text-sariblack/20 text-sm/[104%] tracking-tight font-semibold">
              © 2026 SANUBARI. Medical Disclaimer: For
              <br />
              informational purposes only.
            </p>

            <div className="mt-3 flex items-center justify-center gap-5">
              <button
                className="text-[#B0B3B5] hover:text-[#191C1E] transition-all font-medium"
                style={{ fontSize: "13px" }}
              >
                Privacy Policy
              </button>
              <button
                className="text-[#B0B3B5] hover:text-[#191C1E] transition-all font-medium"
                style={{ fontSize: "13px" }}
              >
                Terms of Service
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}