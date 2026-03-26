import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsLoading(true);
    // Login API
    setIsLoading(false);
    navigate("/home");
  };
  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-[350px]">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome To Rabbit Liquor 🍷
            </CardTitle>
            <p className="text-sm text-gray-500 text-center">
              Login to your account
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              {/* <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
                onClick={handleLogin}
              >
                Login
              </Button> */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
                onClick={handleLogin}
              >
                {isLoading ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <span className="text-purple-600 cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
