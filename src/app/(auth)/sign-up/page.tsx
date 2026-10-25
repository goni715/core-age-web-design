import { Suspense } from "react";
import { Check } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import RegisterForm from "@/components/auth/RegisterForm";

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Information & Stats */}
        <AuthSidebar
          title={
            <>
              Become a<br />
              Partner Sub-Agent
            </>
          }
          subtitle="Start earning commissions by connecting patients with premium healthcare services worldwide."
          securityBanner={
            <div className="flex flex-col gap-4 bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Competitive Commissions
                  </h4>
                  <p className="text-xs text-slate-500">
                    Earn up to 15% on every successful patient referral
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Real-Time Dashboard
                  </h4>
                  <p className="text-xs text-slate-500">
                    Track cases, commissions, and patient progress instantly
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Dedicated Support
                  </h4>
                  <p className="text-xs text-slate-500">
                    24/7 agent support and training resources
                  </p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Modular Sign Up Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <Suspense
              fallback={
                <div className="py-12 text-center text-sm text-slate-400">
                  Loading form...
                </div>
              }
            >
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
