import { useState } from "react";
import { useNavigate } from "react-router";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleResetPassword = async (e) => {

    e.preventDefault();
  
    try {
  
      setError(false);
  
      const response = await fetch(
        "http://localhost:3000/forgot-password",
        {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json"
          },
  
          body: JSON.stringify({
            email
          })
        }
      );
  
      const data = await response.json();
  
      if (data.success) {
  
        setSuccess(true);
  
      } else {
  
        setError(true);
  
        setEmail("");
  
      }
  
    } catch (err) {
  
      console.error(err);
  
      setError(true);
  
      setEmail("");
  
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F9F9F5] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

        <h1 className="text-3xl font-black font-mr text-[#191C1E]">
          SANUBARI
        </h1>

        <h2 className="mt-8 text-2xl font-bold text-[#232527]">
          Account Recovery
        </h2>

        <p className="mt-3 text-sm text-sariblack/70 leading-relaxed">
          Masukkan email akun SANUBARI anda untuk menerima link reset password.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="mt-8"
        >

          <label className="block mb-2 text-xs font-medium text-sariblack/80">
            Gmail
          </label>

          <div className={`h-14 bg-sariwhite rounded-2xl px-4 flex items-center border transition-all ${
            error
              ? "border-red-500"
              : "border-transparent focus-within:border-sariblue"
          }`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          {
            error && (
              <p className="mt-3 text-sm text-red-500">
                Email tidak ditemukan
              </p>
            )
          }

          {
            success && (
              <p className="mt-3 text-sm text-green-600">
                Link reset password berhasil dikirim ke Gmail anda
              </p>
            )
          }

          <button
            type="submit"
            className="mt-6 w-full h-14 rounded-2xl bg-sariblue text-white font-semibold"
          >
            Next
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-4 w-full text-sm text-sariblue font-semibold"
          >
            Kembali ke Login
          </button>

        </form>

      </div>

    </div>
  );
}