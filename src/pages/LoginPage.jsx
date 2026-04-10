import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { signUp, confirmSignUp, signIn, autoSignIn } from "aws-amplify/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [showVerification, setShowVerification] = useState(false);

  const navigate = useNavigate();

  // 1. Initial Sign Up
  const handleSignUp = async (e) => {
    if (!email || !password)
      return toast.error("Please fill in all fields", {
        position: "bottom-right",
      });

    setIsLoading(true);
    try {
      const { nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email },
          autoSignIn: true,
        },
      });
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        toast.success("Verification code sent to your email!");
        setShowVerification(true);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    if (!authCode) return toast.error("Please enter the verification code");

    setIsLoading(true);
    try {
      // Step A: Confirm the code with Cognito
      await confirmSignUp({
        username: email,
        confirmationCode: authCode,
      });

      toast.success("Account verified successfully!");

      // Step B: Direct Login
      // We use the password already in state to log them in immediately
      const { isSignedIn } = await signIn({
        username: email,
        password,
      });

      if (isSignedIn) {
        toast.success("Logging you in...");
        navigate("/home");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error(error.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Standard Login
  const handleLogin = async (e) => {
    setIsLoading(true);
    try {
      const { isSignedIn } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        toast.success("Welcome back!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.name === "UserAlreadyAuthenticatedException") {
        // Logic: If they are already logged in, just send them home!
        console.log("User already has a session. Redirecting...");
        navigate("/home");
      } else {
        console.error("Login failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  // --- UI FOR OTP VERIFICATION ---
  if (showVerification) {
    return (
      <div className="h-screen flex items-center justify-center w-full bg-gray-50">
        <Card className="w-full max-w-[380px] shadow-2xl border-t-4 border-t-purple-600">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Verify Your Email
            </CardTitle>
            <p className="text-sm text-gray-500 text-center mt-2">
              We've sent a 6-digit code to <br />
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConfirmSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  className="text-center text-2xl tracking-[1rem] font-bold h-14"
                  maxLength={6}
                  value={authCode}
                  onChange={(e) =>
                    setAuthCode(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin size-4" />
                    Verifying...
                  </div>
                ) : (
                  "Verify & Finish"
                )}
              </Button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full text-sm text-gray-500 hover:text-purple-600 transition-colors"
                onClick={() => setShowVerification(false)}
              >
                <ArrowLeft size={16} />
                Back to Sign Up
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- UI FOR LOGIN / SIGNUP ---
  return (
    // <div className="h-screen flex items-center justify-center w-full bg-gray-50">
    //   <div className="w-full max-w-[380px]">
    //     <Card className="shadow-2xl border-t-4 border-t-purple-600">
    //       <CardHeader>
    //         <CardTitle className="text-3xl font-bold text-center tracking-tight">
    //           Rabbit Liquor 🍷
    //         </CardTitle>
    //         <p className="text-sm text-gray-500 text-center mt-1">
    //           {isSignIn
    //             ? "Welcome back! Please login."
    //             : "Join the pack today."}
    //         </p>
    //       </CardHeader>

    //       <CardContent>
    //         <form className="space-y-4" onSubmit={onSubmit}>
    //           <div className="space-y-2">
    //             <Label htmlFor="email">Email</Label>
    //             <Input
    //               id="email"
    //               type="email"
    //               placeholder="name@example.com"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <div className="space-y-2">
    //             <Label htmlFor="password">Password</Label>
    //             <Input
    //               id="password"
    //               type="password"
    //               placeholder="••••••••"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //             />
    //           </div>

    //           <Button
    //             type="submit"
    //             disabled={isLoading}
    //             className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 font-semibold"
    //           >
    //             {isLoading ? (
    //               <div className="flex items-center gap-2">
    //                 <Loader2 className="animate-spin size-4" />
    //                 {isSignIn ? "Logging in..." : "Creating account..."}
    //               </div>
    //             ) : isSignIn ? (
    //               "Login"
    //             ) : (
    //               "Sign Up"
    //             )}
    //           </Button>
    //         </form>

    //         <div className="mt-6 text-center text-sm text-gray-500">
    //           {isSignIn
    //             ? "Don't have an account? "
    //             : "Already have an account? "}
    //           <span
    //             className="text-purple-600 cursor-pointer hover:underline font-bold"
    //             onClick={() => {
    //               setIsSignIn(!isSignIn);
    //               setAuthCode("");
    //             }}
    //           >
    //             {isSignIn ? "Create one" : "Sign In"}
    //           </span>
    //         </div>
    //       </CardContent>
    //     </Card>
    <div
      className="min-h-svh w-full flex items-center justify-center bg-bg-base font-sans-app relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_55%_at_50%_40%,rgba(201,168,76,0.07)_0%,transparent_70%)] before:pointer-events-none
      after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle,rgba(201,168,76,0.06)_1px,transparent_1px)] after:[background-size:28px_28px] after:pointer-events-none"
    >
      <div
        className="relative z-[1] w-full max-w-[400px] mx-6 bg-bg-card border border-[rgba(201,168,76,0.2)] rounded-[20px] pt-12 px-10 pb-10 shadow-[0_0_0_1px_rgba(201,168,76,0.06),0_32px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(201,168,76,0.12)]
        before:content-[''] before:absolute before:top-4 before:left-4 before:w-10 before:h-10 before:border-t before:border-l before:border-[rgba(201,168,76,0.3)] before:rounded-tl-[4px] before:pointer-events-none
        after:content-[''] after:absolute after:bottom-4 after:right-4 after:w-10 after:h-10 after:border-b after:border-r after:border-[rgba(201,168,76,0.3)] after:rounded-br-[4px] after:pointer-events-none"
      >
        {/* Brand */}
        <div className="flex flex-col items-center gap-3.5 mb-9">
          <div className="w-[54px] h-[54px] rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.08)] flex items-center justify-center text-gold">
            <Wine size={26} />
          </div>
          <p className="text-[10px] tracking-[4px] uppercase text-gold opacity-80">
            Premium Spirits
          </p>
          <h1 className="font-serif-app text-[22px] font-bold text-white text-center leading-[1.25]">
            Welcome to <em className="text-gold italic">Rabbit Liquor</em>
          </h1>
          <p className="text-[12.5px] text-[#666] text-center">
            Sign in to access your account
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.22)] to-transparent mb-7" />

        {/* Form */}
        <form className="flex flex-col gap-[18px]" onSubmit={handleLogin}>
          <div className="flex flex-col gap-[7px]">
            <label
              htmlFor="lp-email"
              className="text-[11.5px] font-semibold tracking-[1.2px] uppercase text-[#999]"
            >
              Email
            </label>
            <input
              id="lp-email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.2)] rounded-[10px] py-[11px] px-4 text-sm text-text-main font-[inherit] outline-none transition-all duration-[250ms] ease placeholder:text-[#444] focus:border-[rgba(201,168,76,0.6)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <label
              htmlFor="lp-password"
              className="text-[11.5px] font-semibold tracking-[1.2px] uppercase text-[#999]"
            >
              Password
            </label>
            <input
              id="lp-password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.2)] rounded-[10px] py-[11px] px-4 text-sm text-text-main font-[inherit] outline-none transition-all duration-[250ms] ease placeholder:text-[#444] focus:border-[rgba(201,168,76,0.6)] focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-[13px] mt-1.5 bg-gradient-to-br from-gold to-gold-dark text-black text-[13px] font-bold tracking-[1.5px] uppercase font-[inherit] border-none rounded-[10px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-[250ms] shadow-[0_4px_20px_rgba(201,168,76,0.25)] hover:not-disabled:opacity-90 hover:not-disabled:-translate-y-px hover:not-disabled:shadow-[0_8px_28px_rgba(201,168,76,0.35)] active:not-disabled:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
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
          <button
            type="button"
            className="text-gold cursor-pointer bg-none border-none text-[inherit] font-[inherit] p-0 transition-colors duration-200 hover:text-gold-light hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
