"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={<>Set New<br />Password</>}
          subtitle="Create a strong and secure password to protect your account and earnings."
          securityBanner={
            <div className="flex flex-col gap-3">
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Best Practices</h4>
                  <p className="text-xs text-slate-600 mt-1">Use a mix of letters, numbers, and symbols. Avoid using personal information.</p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Reset Password Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h2>
            <p className="text-slate-500 text-sm mb-8">Enter your new password below to regain access.</p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              
              {/* New Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="Enter new password" 
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

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    required
                    placeholder="Confirm new password" 
                    className="w-full pl-10 pr-12 py-6 rounded-xl border-slate-200 focus-visible:ring-blue-100 focus-visible:border-blue-500 text-sm text-slate-700 placeholder:text-slate-400"
                  />
                  <button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20 mt-2">
                Update Password
              </Button>

              {/* Back to Login Link */}
              <div className="flex items-center justify-center mt-4">
                <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
