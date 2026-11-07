import { Suspense } from "react";
import SubAgentRegisterForm from "@/components/auth/SubAgentRegisterForm";
import LandingView from "@/components/landing/LandingView";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function SubAgentReferralTokenPage({ params }: PageProps) {
  const resolvedParams = await params;
  const token = resolvedParams?.token || "";

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
          <SubAgentRegisterForm initialToken={token} />
        </Suspense>
      }
    />
  );
}
