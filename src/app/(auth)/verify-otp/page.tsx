"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, KeyRound, ArrowLeft } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyOtpPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/reset-password");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={<>Verify<br />Account</>}
          subtitle="We've sent a 6-digit verification code to your email. Please enter it below to proceed."
          securityBanner={
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Secure Verification</h4>
                  <p className="text-xs text-slate-600 mt-1">This extra step ensures that only you can access and reset your account credentials.</p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Verify OTP Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify OTP</h2>
            <p className="text-slate-500 text-sm mb-8">Enter the verification code to continue.</p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Code Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 text-center mb-2">Verification Code</label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-lg border-slate-200" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-lg border-slate-200" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-lg border-slate-200" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-lg border-slate-200" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-lg border-slate-200" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-lg border-slate-200" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20 mt-2">
                Verify Code
              </Button>

              <div className="flex flex-col items-center justify-center mt-4 gap-3">
                <p className="text-sm text-slate-500 font-medium">
                  Didn't receive a code? <button type="button" className="text-blue-600 font-bold hover:underline outline-none">Resend</button>
                </p>

                {/* Back to Login Link */}
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
