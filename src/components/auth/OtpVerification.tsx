import React from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OtpVerification() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 flex items-center justify-center">
      <div className="bg-white max-w-[440px] w-full p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
          <Shield className="w-6 h-6" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">OTP Verification</h2>
        <p className="text-slate-500 text-sm mb-8">Verify your identity</p>

        <div className="bg-blue-50/50 border border-blue-100 text-slate-600 text-sm py-3 px-6 rounded-xl w-full mb-8">
          We've sent a 6-digit verification code to <br />
          <span className="font-semibold text-slate-900">+880 1712-345678</span>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-bold text-slate-900 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          ))}
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-md shadow-primary/20 mb-3">
          Verify OTP
        </Button>
        <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 mb-8">
          Change Number
        </Button>

        <p className="text-sm text-slate-500 mb-8">
          Didn't receive the code? <br />
          <Button className="text-slate-900 font-bold hover:underline mt-1">Resend in 57s</Button>
        </p>

        <div className="bg-emerald-50/50 text-emerald-700 text-xs py-3 px-4 rounded-lg w-full text-center font-medium">
          Check your spam folder if you don't see the code. <br />
          Request a new code after the timer expires.
        </div>
      </div>
    </div>
  );
}
