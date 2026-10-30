import { Suspense } from "react";
import { ShieldCheck, Users, Building2, CheckCircle2 } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Information & Partner Ecosystem */}
        <AuthSidebar
          title={
            <>
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                3S Medicare Int
              </span>
            </>
          }
          subtitle="Unified healthcare partner portal for Channel Partners and Sub-Agents to refer patients, track cases, and earn commissions worldwide."
          securityBanner={
            <div className="flex flex-col gap-3 bg-gradient-to-br from-blue-50/80 via-white to-teal-50/60 p-4.5 rounded-2xl border border-blue-100 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-blue-100/70">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Dual Partner Network Access
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Channel Partner & Sub-Agent Secure Portals
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">Master Channel Agents</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">Sub-Agent Network</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Bank-grade 256-bit encryption & HIPAA security</span>
              </div>
            </div>
          }
        />

        {/* Right Side: Modular Login Form with Role Tabs */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[480px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <Suspense
              fallback={
                <div className="py-12 text-center text-sm text-slate-400">
                  Loading login portal...
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
