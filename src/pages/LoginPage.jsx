import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wine } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Login API
    setIsLoading(false);
    navigate("/home");
  };
  return (
    <div className="min-h-svh w-full flex items-center justify-center bg-bg-base font-sans-app relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_55%_at_50%_40%,rgba(201,168,76,0.07)_0%,transparent_70%)] before:pointer-events-none
      after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle,rgba(201,168,76,0.06)_1px,transparent_1px)] after:[background-size:28px_28px] after:pointer-events-none">
      <div className="relative z-[1] w-full max-w-[400px] mx-6 bg-bg-card border border-[rgba(201,168,76,0.2)] rounded-[20px] pt-12 px-10 pb-10 shadow-[0_0_0_1px_rgba(201,168,76,0.06),0_32px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(201,168,76,0.12)]
        before:content-[''] before:absolute before:top-4 before:left-4 before:w-10 before:h-10 before:border-t before:border-l before:border-[rgba(201,168,76,0.3)] before:rounded-tl-[4px] before:pointer-events-none
        after:content-[''] after:absolute after:bottom-4 after:right-4 after:w-10 after:h-10 after:border-b after:border-r after:border-[rgba(201,168,76,0.3)] after:rounded-br-[4px] after:pointer-events-none">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3.5 mb-9">
          <div className="w-[54px] h-[54px] rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] flex items-center justify-center text-gold">
            <Wine size={26} />
          </div>
          <p className="text-[10px] tracking-[4px] uppercase text-gold opacity-80">Premium Spirits</p>
          <h1 className="font-serif-app text-[22px] font-bold text-white text-center leading-[1.25]">
            Welcome to <em className="text-gold italic">Rabbit Liquor</em>
          </h1>
          <p className="text-[12.5px] text-[#666] text-center">Sign in to access your account</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.22)] to-transparent mb-7" />

        {/* Form */}
        <form className="flex flex-col gap-[18px]" onSubmit={handleLogin}>
          <div className="flex flex-col gap-[7px]">
            <label htmlFor="lp-email" className="text-[11.5px] font-semibold tracking-[1.2px] uppercase text-[#999]">Email</label>
            <input
              id="lp-email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.2)] rounded-[10px] py-[11px] px-4 text-sm text-text-main font-[inherit] outline-none transition-all duration-[250ms] ease placeholder:text-[#444] focus:border-[rgba(201,168,76,0.6)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label htmlFor="lp-password" className="text-[11.5px] font-semibold tracking-[1.2px] uppercase text-[#999]">Password</label>
            <input
              id="lp-password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.2)] rounded-[10px] py-[11px] px-4 text-sm text-text-main font-[inherit] outline-none transition-all duration-[250ms] ease placeholder:text-[#444] focus:border-[rgba(201,168,76,0.6)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>

          <button type="submit" className="w-full py-[13px] mt-1.5 bg-gradient-to-br from-gold to-gold-dark text-black text-[13px] font-bold tracking-[1.5px] uppercase font-[inherit] border-none rounded-[10px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-[250ms] shadow-[0_4px_20px_rgba(201,168,76,0.25)] hover:not-disabled:opacity-90 hover:not-disabled:-translate-y-px hover:not-disabled:shadow-[0_8px_28px_rgba(201,168,76,0.35)] active:not-disabled:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="w-[15px] h-[15px] border-2 border-[rgba(0,0,0,0.25)] border-t-black rounded-full animate-lp-spin shrink-0" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-[12.5px] text-[#555]">
          Don&apos;t have an account?{" "}
          <button type="button" className="text-gold cursor-pointer bg-none border-none text-[inherit] font-[inherit] p-0 transition-colors duration-200 hover:text-gold-light hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}


