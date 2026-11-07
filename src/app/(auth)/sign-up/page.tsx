import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import LandingView from "@/components/landing/LandingView";

export default function SignUpPage() {
  return (
    <LandingView
      authCard={
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-slate-400">
              Loading register...
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      }
    />
  );
}
