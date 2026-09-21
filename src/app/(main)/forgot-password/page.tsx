"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";

export default function ForgotPasswordPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending recovery email
    alert("If this email exists, a reset link will be sent.");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={<>Account<br />Recovery</>}
          subtitle="Forgot your password? No problem, we'll help you get back to managing your patients and commissions."
          securityBanner={
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Secure Recovery</h4>
                  <p className="text-xs text-slate-600 mt-1">We will send a secure link to your registered email or phone.</p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Forgot Password Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password</h2>
            <p className="text-slate-500 text-sm mb-8">Enter the email address associated with your agent account.</p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email / Phone Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Email or Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your email or phone number" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20 mt-2">
                Send Reset Link
              </Button>

              {/* Back to Login Link */}
              <p className="text-center text-sm font-medium mt-4">
                <Link href="/login" className="flex items-center justify-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
