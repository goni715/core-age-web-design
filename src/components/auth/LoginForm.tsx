"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Mail,
  Lock,
  Building2,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { loginSchema } from "@/schemas/auth.schema";
import CustomIconInput from "@/components/common/CustomIconInput";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import SubmitButton from "@/components/common/SubmitButton";
import Link from "next/link";
import ErrorAlert from "@/components/alert/ErrorAlert";
import {
  useLoginMutation,
  useLoginSubAgentMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetLoginError } from "@/redux/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { isLoggedIn, isSubAgent } from "@/helpers/SessionHelper";
import { cn } from "@/lib/utils";

type TFormValues = z.infer<typeof loginSchema>;

type TRole = "agent" | "sub-agent";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const roleParam = searchParams.get("role");
  const defaultRole: TRole =
    roleParam === "sub-agent" || roleParam === "subagent" ? "sub-agent" : "agent";

  const [role, setRole] = useState<TRole>(defaultRole);
  const [loginAgent, { isLoading: isAgentLoading }] = useLoginMutation();
  const [loginSubAgent, { isLoading: isSubAgentLoading }] =
    useLoginSubAgentMutation();
  const isLoading = isAgentLoading || isSubAgentLoading;

  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // If already logged in, redirect away from login page to role dashboard
  useEffect(() => {
    if (isLoggedIn()) {
      if (callbackUrl && callbackUrl !== "/") {
        router.replace(callbackUrl);
      } else if (isSubAgent()) {
        router.replace("/sub-agent/dashboard");
      } else {
        router.replace("/agent/dashboard");
      }
    }
  }, [router, callbackUrl]);

  const { handleSubmit, control, setValue } = useForm<TFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },
  });

  // Clear previous login error and load remembered email on mount
  useEffect(() => {
    dispatch(SetLoginError(""));
    try {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setValue("email", savedEmail);
        setValue("isRememberMe", true);
      }
    } catch {
      // Ignore localStorage errors in SSR / strict privacy modes
    }
  }, [dispatch, setValue]);

  const handleRoleChange = (newRole: TRole) => {
    setRole(newRole);
    dispatch(SetLoginError(""));
  };

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    dispatch(SetLoginError(""));
    try {
      const payload = {
        email: data.email.trim(),
        password: data.password,
        isRememberMe: Boolean(data.isRememberMe),
      };

      const res =
        role === "sub-agent"
          ? await loginSubAgent(payload)
          : await loginAgent(payload);

      if (
        "data" in res &&
        (res?.data?.success || res?.data?.data?.accessToken)
      ) {
        if (data.isRememberMe) {
          localStorage.setItem("rememberedEmail", data.email.trim());
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        const destination =
          callbackUrl && callbackUrl !== "/"
            ? callbackUrl
            : role === "sub-agent"
              ? "/sub-agent/dashboard"
              : "/agent/dashboard";
        router.push(destination);
      }
    } catch {
      // Error handled in onQueryStarted via authApi and authSlice
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Clean, Fancy & Perfectly Responsive Role Selector Tabs */}
      <div className="p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-2 gap-1.5">
          {/* Agent Tab Button */}
          <button
            type="button"
            onClick={() => handleRoleChange("agent")}
            style={
              role === "agent"
                ? {
                    background: "linear-gradient(135deg, #005ca9 0%, #1d4ed8 100%)",
                    color: "#ffffff",
                  }
                : {
                    background: "#ffffff",
                    color: "#334155",
                  }
            }
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer select-none text-center",
              role === "agent"
                ? "shadow-md shadow-blue-500/25 ring-2 ring-blue-500/30 scale-[1.01]"
                : "border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <Building2
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                role === "agent" ? "text-white" : "text-blue-600"
              )}
            />
            <span className="tracking-tight">Agent</span>
          </button>

          {/* Sub-Agent Tab Button */}
          <button
            type="button"
            onClick={() => handleRoleChange("sub-agent")}
            style={
              role === "sub-agent"
                ? {
                    background: "linear-gradient(135deg, #0d9488 0%, #059669 100%)",
                    color: "#ffffff",
                  }
                : {
                    background: "#ffffff",
                    color: "#334155",
                  }
            }
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer select-none text-center",
              role === "sub-agent"
                ? "shadow-md shadow-teal-500/25 ring-2 ring-teal-500/30 scale-[1.01]"
                : "border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <Users
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                role === "sub-agent" ? "text-white" : "text-teal-600"
              )}
            />
            <span className="tracking-tight">Sub-Agent</span>
          </button>
        </div>
      </div>



      {/* 2. Dynamic Portal Title & Description */}
      <div className="space-y-1.5 transition-all duration-200">
        <div className="flex items-center gap-2">
          {role === "agent" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Channel Partner Portal</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sub-Agent Referral Portal</span>
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {role === "agent" ? "Agent Sign In" : "Sub-Agent Sign In"}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          {role === "agent"
            ? "Enter your credentials to access your agent dashboard, patients & commission reports."
            : "Login with your assigned sub-agent account to view your cases & referral earnings."}
        </p>
      </div>

      {/* Error Alert */}
      {LoginError && (
        <ErrorAlert
          message={LoginError}
          onClose={() => dispatch(SetLoginError(""))}
        />
      )}

      {/* 3. Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomIconInput
          label="Email Address"
          name="email"
          type="email"
          control={control}
          placeholder={
            role === "agent" ? "agent@medicare.com" : "subagent@example.com"
          }
          icon={Mail}
          disabled={isLoading}
          autoComplete="email"
          required
        />

        <CustomIconInput
          label="Password"
          name="password"
          type="password"
          control={control}
          placeholder="••••••••"
          icon={Lock}
          disabled={isLoading}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
          <CustomCheckbox
            control={control}
            name="isRememberMe"
            label="Remember me"
            disabled={isLoading}
          />
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <SubmitButton
          isLoading={isLoading}
          loadingTitle={
            role === "agent"
              ? "Signing in as Agent..."
              : "Signing in as Sub-Agent..."
          }
          style={
            role === "agent"
              ? {
                  background: "linear-gradient(135deg, #005ca9 0%, #1d4ed8 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px 0 rgba(0, 92, 169, 0.35)",
                }
              : {
                  background: "linear-gradient(135deg, #0d9488 0%, #059669 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px 0 rgba(13, 148, 136, 0.39)",
                }
          }
          className="h-11 text-sm font-semibold !text-white transition-all rounded-xl cursor-pointer hover:opacity-95 active:scale-[0.99]"
        >
          <span className="font-semibold text-white">
            Sign In as {role === "agent" ? "Agent" : "Sub-Agent"}
          </span>
          <ArrowRight className="w-4 h-4 ml-1 text-white" />
        </SubmitButton>

      </form>

      {/* 4. Dynamic Footer based on role */}
      <div className="pt-2 border-t border-slate-100 text-center">
        {role === "agent" ? (
          <p className="text-center text-xs sm:text-sm text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-center text-xs sm:text-sm text-slate-500 font-medium">
            Need a Sub-Agent account?{" "}
            <span className="text-slate-700 font-semibold">
              Contact your Channel Partner Agent for an invitation link
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
