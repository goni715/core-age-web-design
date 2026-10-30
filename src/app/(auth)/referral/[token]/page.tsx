import { Suspense } from "react";
import { Check, ShieldCheck } from "lucide-react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import SubAgentRegisterForm from "@/components/auth/SubAgentRegisterForm";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function SubAgentReferralPage({ params }: PageProps) {
  const resolvedParams = await params;
  const token = resolvedParams?.token || "";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Information & Sub-Agent Perks */}
        <AuthSidebar
          title={
            <>
              Join as an Authorized<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Sub-Agent Partner
              </span>
            </>
          }
          subtitle="Start earning attractive commissions by connecting patients with premier international hospitals worldwide under your sponsoring partner."
          securityBanner={
            <div className="flex flex-col gap-3.5 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-emerald-50/50 p-5 rounded-2xl border border-blue-100/80 shadow-2xs">
              {/* Partner Link Notice */}
              <div className="flex gap-3 items-start pb-3 border-b border-blue-100/70">
                <div className="bg-blue-600 p-1.5 rounded-xl shrink-0 text-white shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                    <span>Authorized Partner Invitation</span>
                    <span className="inline-flex items-center gap-1 font-mono bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Verified Link
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    You are registering through a verified Channel Partner invitation with guaranteed commission attribution.
                  </p>
                </div>
              </div>

              {/* Benefit 1 */}
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Tiered Sub-Agent Commissions
                  </h4>
                  <p className="text-xs text-slate-500">
                    Earn up to 12% - 15% bonus on every successfully treated patient case
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Dedicated Patient Desk
                  </h4>
                  <p className="text-xs text-slate-500">
                    We manage hospital appointments, medical visas, and translation for your patients
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-100 p-1 rounded-full shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Transparent Network Dashboard
                  </h4>
                  <p className="text-xs text-slate-500">
                    Track patient treatment progress, case stages, and earnings live 24/7
                  </p>
                </div>
              </div>
            </div>
          }
        />

        {/* Right Side: Modular Sub-Agent Registration Form */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white w-full max-w-[490px] p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
            <Suspense
              fallback={
                <div className="py-12 text-center text-sm text-slate-400">
                  Loading registration form...
                </div>
              }
            >
              <SubAgentRegisterForm initialToken={token} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
