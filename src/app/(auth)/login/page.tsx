import { Suspense } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={
            <>
              Welcome to
              <br />
              3S Medicare Int
            </>
          }
          subtitle="Join our healthcare network and earn commissions while helping patients access premium medical travel services."
          securityBanner={
            <div className="flex flex-col gap-3">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    Secure Access
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Bank-level encryption for all agent data
                  </p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Modular Login Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Agent Login
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Login to manage patients, cases, and commissions.
            </p>

            <Suspense fallback={<div className="py-12 text-center text-sm text-slate-400">Loading form...</div>}>
              <LoginForm />
            </Suspense>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-500 font-medium mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
