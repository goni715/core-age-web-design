import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={
            <>
              Account
              <br />
              Verification
            </>
          }
          subtitle="We've sent a 6-digit verification code to your email. Please enter it below to activate your partner account."
          securityBanner={
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    Secure Verification
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Bank-level encryption and OTP security ensure your agent account credentials are safe.
                  </p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Modular Verify OTP Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="relative bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-teal-400 to-blue-500" />
            <Suspense
              fallback={
                <div className="py-12 text-center text-sm text-slate-400">
                  Loading verification form...
                </div>
              }
            >
              <VerifyOtpForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
