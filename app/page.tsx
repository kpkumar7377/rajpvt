"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
   const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const STATIC_USER = "admin@rajprivatehouse.com";
  const STATIC_PASS = "Tejas@2021";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Verify credentials
    setTimeout(() => {
      if (
        userId.trim().toLowerCase() === STATIC_USER.toLowerCase() &&
        password === STATIC_PASS
      ) {
        setIsSuccess(true);
        setIsLoading(false);

        const sessionPayload = {
          userId,
          sessionKey: "rph_" + Math.random().toString(36).substring(2, 12),
          loginTime: Date.now(),
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("auth", JSON.stringify(sessionPayload));
        }

        setTimeout(() => {
          router.replace("/dashboard");
        }, 1200);
      } else {
        setIsLoading(false);
        setError("Invalid credentials. Please verify your details.");
      }
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none bg-slate-950 font-sans">
      {/* Kept identical to your background setup with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url('/background.jpg')`,
        }}
      />

      {/* Atmospheric dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-black/60 to-slate-950/85 backdrop-blur-[2px]" />

      {/* Subtle luxury ambient glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="relative bg-neutral-900/65 rounded-3xl p-8 sm:p-10 shadow-inner border border-white/10">
            {/* Top Emblem & Branding */}
            <div className="flex flex-col items-center text-center mb-7">
              <div className="relative mb-3.5 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 to-indigo-500/40 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/20 flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-amber-400/90 drop-shadow" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center">
                    <KeyRound className="w-2.5 h-2.5 text-amber-300" />
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Raj Private House
              </h1>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Enter your credentials to enter
              </p>
            </div>

            {/* Error Notification Banner */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Success Notification Banner */}
            {isSuccess && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <p className="font-medium">
                  Access granted. Unlocking dashboard...
                </p>
              </div>
            )}

            {}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* User ID Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium tracking-wide uppercase text-neutral-300 ml-1">
                  User ID / Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="name@rajprivatehouse.com"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full bg-white/[0.07] hover:bg-white/[0.09] focus:bg-white/[0.12] border border-white/15 focus:border-amber-400/70 text-white placeholder-neutral-500 text-sm pl-10 pr-4 py-3 rounded-xl outline-none transition-all shadow-inner focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium tracking-wide uppercase text-neutral-300 ml-1 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full bg-white/[0.07] hover:bg-white/[0.09] focus:bg-white/[0.12] border border-white/15 focus:border-amber-400/70 text-white placeholder-neutral-500 text-sm pl-10 pr-11 py-3 rounded-xl outline-none transition-all shadow-inner focus:ring-2 focus:ring-amber-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-neutral-400 hover:text-white transition"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full !mt-6 py-3.5 px-4 rounded-xl font-medium text-sm tracking-wide text-neutral-900 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 active:scale-[0.99] transition-all duration-200 shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-neutral-900"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Authenticating...</span>
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlocked</span>
                  </div>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
