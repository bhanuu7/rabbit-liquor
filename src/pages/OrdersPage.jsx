import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

export default function OrdersPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl border border-gray-700 bg-gray-900/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tight text-white"
            >
              🚀 Coming Soon
            </motion.h1>

            <p className="text-gray-400 text-sm">
              We're working hard to launch something amazing. Stay tuned!
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button type="submit" className="w-full">
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="text-green-400 text-sm">
                🎉 You're on the list! We'll notify you.
              </div>
            )}

            <div className="flex justify-center gap-4 text-gray-500 text-xs">
              <span>© {new Date().getFullYear()}</span>
              <span>•</span>
              <span>Your App</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
