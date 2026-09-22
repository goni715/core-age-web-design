"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, User, Check, Briefcase } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={<>Become a<br />Partner Sub-Agent</>}
          subtitle="Start earning commissions by connecting patients with premium healthcare services worldwide."
          securityBanner={
            <div className="flex flex-col gap-4 bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0"><Check className="w-4 h-4 text-emerald-600" /></div>
                <div><h4 className="text-sm font-bold text-slate-900">Competitive Commissions</h4><p className="text-xs text-slate-500">Earn up to 15% on every successful patient referral</p></div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0"><Check className="w-4 h-4 text-emerald-600" /></div>
                <div><h4 className="text-sm font-bold text-slate-900">Real-Time Dashboard</h4><p className="text-xs text-slate-500">Track cases, commissions, and patient progress instantly</p></div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0"><Check className="w-4 h-4 text-emerald-600" /></div>
                <div><h4 className="text-sm font-bold text-slate-900">Dedicated Support</h4><p className="text-xs text-slate-500">24/7 agent support and training resources</p></div>
              </div>
            </div>
          }
        />

        {/* Right Side: Sign Up Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Agent Sign Up</h2>
            <p className="text-slate-500 text-sm mb-8">Create your partner account to get started.</p>

            <form className="flex flex-col gap-4">
              {/* Full Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your full legal name" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Agency/Business Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Agency/Business Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your agency or business name" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Email / Phone Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Email or Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your email or phone number" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
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
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a strong password" 
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                  />
                  <Button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm your password" 
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                  />
                  <Button 
                    type="button" 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Terms of Service */}
              <label className="flex items-start gap-3 cursor-pointer mt-1">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-500 leading-snug">
                  By signing up, you agree to our <Link href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</Link>
                </span>
              </label>

              {/* Submit Button */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20 mt-2">
                Create Account
              </Button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-slate-500 font-medium mt-4">
                Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
