import { Suspense } from "react";
import SubAgentRegisterForm from "@/components/auth/SubAgentRegisterForm";
import LandingView from "@/components/landing/LandingView";

export default function SubAgentReferralBasePage() {
  const defaultToken = "CP-8841";

  return (
    <LandingView
      authCard={
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-slate-400">
              Loading referral invitation...
            </div>
          }
        >
          <SubAgentRegisterForm initialToken={defaultToken} />
        </Suspense>
      }
    />
  );
}
