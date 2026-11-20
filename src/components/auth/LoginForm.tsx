"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  Mail,
  Lock,
  ArrowRight,
  UserPlus,
  Share2,
} from "lucide-react";
import { loginSchema } from "@/schemas/auth.schema";
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
    roleParam === "agent" || roleParam === "channel-partner"
      ? "agent"
      : "sub-agent";

  const [role, setRole] = useState<TRole>(defaultRole);
  const [loginAgent, { isLoading: isAgentLoading }] = useLoginMutation();
  const [loginSubAgent, { isLoading: isSubAgentLoading }] =
    useLoginSubAgentMutation();
  const isLoading = isAgentLoading || isSubAgentLoading;

  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },
  });

  useEffect(() => {
    dispatch(SetLoginError(""));
    try {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setValue("email", savedEmail);
        setValue("isRememberMe", true);
      }
    } catch {
      // Ignore localStorage errors
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
        (res?.data?.success ||
          res?.data?.statusCode === 200 ||
          res?.data?.statusCode === 201)
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
      // Error handled in onQueryStarted
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Pill Toggle between Referral Partner and Channel Partner */}
      <div className="p-1 bg-slate-100/90 rounded-2xl flex items-center gap-1">
        <button
          type="button"
          onClick={() => handleRoleChange("sub-agent")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
            role === "sub-agent"
              ? "bg-[#005ca9] text-white shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          <UserPlus className="w-4 h-4 shrink-0" />
          <span>Referral Partner</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange("agent")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
            role === "agent"
              ? "bg-[#005ca9] text-white shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Share2 className="w-4 h-4 shrink-0" />
          <span>Channel Partner</span>
        </button>
      </div>

      {/* 2. Badge & Title */}
      <div className="space-y-1.5 pt-1">
        <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
          {role === "sub-agent" ? "Referral Partner Portal" : "Channel Partner Portal"}
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {role === "sub-agent" ? "Referral Partner Sign In" : "Channel Partner Sign In"}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          {role === "sub-agent"
            ? "Sign in to submit patients, track their cases and view your commission reports."
            : "Sign in to manage your referral network, direct patients and revenue reports."}
        </p>
      </div>

      {/* Error Alert */}
      {LoginError && (
        <ErrorAlert
          message={LoginError}
          onClose={() => dispatch(SetLoginError(""))}
        />
      )}

      {/* 3. Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          {errors.email && (
            <p className="text-rose-500 text-[11px]">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          {errors.password && (
            <p className="text-rose-500 text-[11px]">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
            <input
              type="checkbox"
              {...register("isRememberMe")}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-[#005ca9] hover:bg-[#004e90] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <span>
            {isLoading
              ? "Signing in..."
              : role === "sub-agent"
                ? "Sign In as Referral Partner"
                : "Sign In as Channel Partner"}
          </span>
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      {/* 4. Switch to Sign Up */}
      <div className="pt-2 text-center text-xs text-slate-500">
        {role === "sub-agent" ? (
          <div className="space-y-1">
            <div>
              New Referral Partner?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 font-bold hover:underline"
              >
                Register as Referral Partner
              </Link>
            </div>
            <div>
              Have a Channel Partner invitation token?{" "}
              <Link
                href="/referral"
                className="text-emerald-700 font-semibold hover:underline"
              >
                Join via Invitation Code
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600">
            Channel Partner master accounts are provisioned exclusively by administration. Please sign in with your authorized credentials.
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
