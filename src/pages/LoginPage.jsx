import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");

    setIsLoading(true);
    try {
      const { nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email },
          // If your Cognito pool is configured for it, this allows auto-login after OTP
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
        email,
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
    <div className="h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="w-full max-w-[380px]">
        <Card className="shadow-2xl border-t-4 border-t-purple-600">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center tracking-tight">
              Rabbit Liquor 🍷
            </CardTitle>
            <p className="text-sm text-gray-500 text-center mt-1">
              {isSignIn
                ? "Welcome back! Please login."
                : "Join the pack today."}
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin size-4" />
                    {isSignIn ? "Logging in..." : "Creating account..."}
                  </div>
                ) : isSignIn ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className="text-purple-600 cursor-pointer hover:underline font-bold"
                onClick={() => {
                  setIsSignIn(!isSignIn);
                  setAuthCode("");
                }}
              >
                {isSignIn ? "Create one" : "Sign In"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
