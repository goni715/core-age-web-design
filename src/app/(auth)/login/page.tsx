"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import AuthSidebar from "@/components/auth/AuthSidebar";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={<>Welcome to<br />3S Medicare Int</>}
          subtitle="Join our healthcare network and earn commissions while helping patients access premium medical travel services."
          securityBanner={
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Secure Access</h4>
                  <p className="text-xs text-slate-600 mt-1">Bank-level encryption for all agent data</p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Login Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Agent Login</h2>
            <p className="text-slate-500 text-sm mb-8">Login to manage patients, cases, and commissions.</p>

            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              {/* Email / Phone Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Email or Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input 
                    type="text" 
                    placeholder="Enter your email or phone number" 
                    className="w-full pl-10 pr-4 py-6 rounded-xl border-slate-200 focus-visible:ring-blue-100 focus-visible:border-blue-500 text-sm text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className="w-full pl-10 pr-12 py-6 rounded-xl border-slate-200 focus-visible:ring-blue-100 focus-visible:border-blue-500 text-sm text-slate-700 placeholder:text-slate-400"
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-medium text-slate-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20 mt-2">
                Sign In
              </Button>



              {/* Divider */}
              <div className="relative flex items-center py-2 mt-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium">or continue with</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-2">
                  <FcGoogle className="w-5 h-5" />
                  Google
                </Button>
                <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-2">
                  <FaApple className="w-5 h-5 text-black" />
                  Apple
                </Button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-slate-500 font-medium mt-4">
                Don't have an account? <Link href="/sign-up" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
