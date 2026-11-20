"use client";

import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subAgentRegisterSchema,
  type TSubAgentRegisterValues,
} from "@/schemas/auth.schema";
import Link from "next/link";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  UserPlus,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useRegisterReferralPartnerMutation } from "@/redux/features/referralPartner/referralPartnerApi";
import { SuccessToast, ErrorToast } from "@/helpers/ValidationHelper";
import ErrorAlert from "@/components/alert/ErrorAlert";

interface SubAgentRegisterFormProps {
  initialToken?: string;
}

const SubAgentRegisterForm: React.FC<SubAgentRegisterFormProps> = ({
  initialToken,
}) => {
  const router = useRouter();
  const params = useParams();
  const paramToken = Array.isArray(params?.token)
    ? params.token[0]
    : (params?.token as string) || "";
  const rawToken = paramToken || initialToken || "";

  let tokenFromUrl = rawToken;
  try {
    tokenFromUrl = decodeURIComponent(rawToken);
  } catch {
    tokenFromUrl = rawToken;
  }
  tokenFromUrl = tokenFromUrl.trim();

  const [registerReferralPartner, { isLoading: isRegistering }] =
    useRegisterReferralPartnerMutation();

  const [submitError, setSubmitError] = useState<string>("");
  const [submittedData, setSubmittedData] =
    useState<TSubAgentRegisterValues | null>(null);
  const [countdown, setCountdown] = useState<number>(5);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TSubAgentRegisterValues>({
    resolver: zodResolver(subAgentRegisterSchema),
    defaultValues: {
      fullName: "",
      agencyName: "",
      email: "",
      phone: "",
      referralToken: tokenFromUrl,
      password: "",
      confirmPassword: "",
      termsAccepted: true,
    },
  });

  React.useEffect(() => {
    if (tokenFromUrl) {
      setValue("referralToken", tokenFromUrl);
    }
  }, [tokenFromUrl, setValue]);

  React.useEffect(() => {
    if (!submittedData) return;
    if (countdown <= 0) {
      router.push("/login?role=sub-agent");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [submittedData, countdown, router]);

  const onSubmit: SubmitHandler<TSubAgentRegisterValues> = async (data) => {
    setSubmitError("");
    const token = (
      data.referralToken ||
      tokenFromUrl ||
      initialToken ||
      (Array.isArray(params?.token) ? params.token[0] : (params?.token as string)) ||
      ""
    ).trim();

    if (!token) {
      const msg =
        "Referral token is missing from the invitation URL. Please use a valid referral invitation link.";
      setSubmitError(msg);
      ErrorToast(msg);
      return;
    }

    try {
      const cleanPhone = data.phone.trim().replace(/\s+/g, "");

      const res = await registerReferralPartner({
        referralToken: token,
        fullName: data.fullName.trim(),
        agencyName: data.agencyName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: cleanPhone,
        password: data.password,
      }).unwrap();

      SuccessToast(
        res?.message ||
          "Referral Partner registered successfully! You can now login directly."
      );

      setCountdown(5);
      setSubmittedData({
        ...data,
        phone: cleanPhone,
        referralToken: token,
      });
    } catch (err: unknown) {
      const errorResponse = err as {
        data?: { message?: string };
        error?: string;
      };
      const errorMsg =
        errorResponse?.data?.message ||
        errorResponse?.error ||
        "Registration failed. Please check the referral link.";
      setSubmitError(errorMsg);
      ErrorToast(errorMsg);
    }
  };

  if (submittedData) {
    return (
      <div className="space-y-6 text-center py-2 animate-in fade-in-50 zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Registration Successful
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome to 3S Network!
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Your Referral Partner account has been activated. You can now login directly
            to access your referral dashboard.
          </p>
        </div>

        {/* Account Summary Card */}
        <div className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-200/70 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Applicant:</span>
            <span className="font-bold text-slate-800">{submittedData.fullName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Agency / Clinic:</span>
            <span className="font-semibold text-slate-800">{submittedData.agencyName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Email:</span>
            <span className="font-medium text-slate-700">{submittedData.email}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Phone:</span>
            <span className="font-medium text-slate-700">{submittedData.phone}</span>
          </div>
          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Active Referral Partner
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/login?role=sub-agent"
            className="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl font-semibold text-sm bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <span>Proceed to Login ({countdown}s)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Register Another Account</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[11px] font-semibold">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Referral Partner Invitation</span>
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Register as Referral Partner
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          You have been invited to join 3S Medi Care international healthcare network. Complete your profile to start referring patients.
        </p>
      </div>

      {submitError && (
        <ErrorAlert message={submitError} onClose={() => setSubmitError("")} />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Manik Islam"
              {...register("fullName")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
            />
          </div>
          {errors.fullName && (
            <p className="text-rose-500 text-[11px]">{errors.fullName.message}</p>
          )}
        </div>

        {/* Agency / Clinic */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Clinic / Agency / Business Name
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Care Point Clinic"
              {...register("agencyName")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
            />
          </div>
          {errors.agencyName && (
            <p className="text-rose-500 text-[11px]">{errors.agencyName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
            />
          </div>
          {errors.email && (
            <p className="text-rose-500 text-[11px]">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              placeholder="01700000000"
              {...register("phone")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
            />
          </div>
          {errors.phone && (
            <p className="text-rose-500 text-[11px]">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
            />
          </div>
          {errors.password && (
            <p className="text-rose-500 text-[11px]">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-rose-500 text-[11px]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isRegistering}
          className="w-full py-2.5 px-4 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 pt-2"
        >
          <span>
            {isRegistering ? "Creating account..." : "Register as Referral Partner"}
          </span>
          {!isRegistering && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      {/* Switch to Login / Direct Register */}
      <div className="pt-2 text-center text-xs text-slate-500 space-y-1.5">
        <div>
          Already have an account?{" "}
          <Link
            href="/login?role=sub-agent"
            className="text-teal-700 font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>
        <div>
          Don&apos;t have an invitation code?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 font-bold hover:underline"
          >
            Direct Referral Partner Sign-Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubAgentRegisterForm;
