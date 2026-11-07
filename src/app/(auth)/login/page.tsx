import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import LandingView from "@/components/landing/LandingView";

export default function LoginPage() {
  return (
    <LandingView
      authCard={
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-slate-400">
              Loading sign in...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      }
    />
  );
}
