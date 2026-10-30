"use client";

import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subAgentRegisterSchema,
  type TSubAgentRegisterValues,
} from "@/schemas/auth.schema";
import CustomIconInput from "@/components/common/CustomIconInput";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import SubmitButton from "@/components/common/SubmitButton";
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
  Users,
  RotateCcw,
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

  const { handleSubmit, control, setValue } =
    useForm<TSubAgentRegisterValues>({
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

  // Keep referralToken synced in form state from URL param
  React.useEffect(() => {
    if (tokenFromUrl) {
      setValue("referralToken", tokenFromUrl);
    }
  }, [tokenFromUrl, setValue]);

  // Auto-redirect to login after 5 seconds on successful registration (No OTP required)
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
      const msg = "Referral token is missing from the invitation URL. Please use a valid referral link.";
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
        res?.message || "Sub-Agent registered successfully! You can now login directly."
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

  // Success view once registered (No OTP verification required)
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
            Welcome to the Network!
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Your Sub-Agent account has been created. You can now login directly
            to access your referral dashboard.
          </p>
        </div>

        {/* Account Summary Card */}
        <div className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-200/70 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Applicant:</span>
            <span className="font-bold text-slate-800">
              {submittedData.fullName}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Sub-Agency / Clinic:</span>
            <span className="font-semibold text-slate-800">
              {submittedData.agencyName}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Email:</span>
            <span className="font-medium text-slate-700">
              {submittedData.email}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Phone:</span>
            <span className="font-medium text-slate-700">
              {submittedData.phone}
            </span>
          </div>
          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Active Partner
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
      {/* Form Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-2.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <Users className="w-3.5 h-3.5" />
          <span>Authorized Sub-Agent Registration</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Sub-Agent Sign Up
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Complete your information to join your Channel Partner&apos;s referral
          network.
        </p>
      </div>

      {/* Error Alert */}
      {submitError && (
        <ErrorAlert
          message={submitError}
          onClose={() => setSubmitError("")}
        />
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <CustomIconInput
          label="Full Name"
          name="fullName"
          control={control}
          placeholder="Enter full name"
          icon={User}
          disabled={isRegistering}
          required
        />

        {/* Agency / Clinic / Practice Name */}
        <CustomIconInput
          label="Sub-Agency / Clinic Name"
          name="agencyName"
          control={control}
          placeholder="e.g. Dhaka Health Consultancy"
          icon={Briefcase}
          disabled={isRegistering}
          required
        />

        {/* Email Address */}
        <CustomIconInput
          label="Email Address"
          name="email"
          type="email"
          control={control}
          placeholder="e.g. subagent@example.com"
          icon={Mail}
          disabled={isRegistering}
          autoComplete="email"
          required
        />

        {/* Phone Number */}
        <CustomIconInput
          label="Phone Number"
          name="phone"
          type="tel"
          control={control}
          placeholder="e.g. 01712345678 or +8801712345678"
          icon={Phone}
          disabled={isRegistering}
          autoComplete="tel"
          required
        />

        {/* Password */}
        <CustomIconInput
          label="Password"
          name="password"
          type="password"
          control={control}
          placeholder="••••••••"
          icon={Lock}
          disabled={isRegistering}
          autoComplete="new-password"
          required
        />

        {/* Confirm Password */}
        <CustomIconInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          control={control}
          placeholder="••••••••"
          icon={Lock}
          disabled={isRegistering}
          autoComplete="new-password"
          required
        />

        {/* Terms Checkbox */}
        <CustomCheckbox
          name="termsAccepted"
          control={control}
          disabled={isRegistering}
          label={
            <span className="text-xs text-slate-500 leading-relaxed">
              I agree to 3S Medicare&apos;s{" "}
              <Link
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Terms of Service
              </Link>
              ,{" "}
              <Link
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Privacy Policy
              </Link>
              , and the{" "}
              <span className="text-slate-700 font-semibold">
                Sub-Agent Partner Agreement
              </span>
              .
            </span>
          }
        />

        {/* Submit Button */}
        <SubmitButton
          isLoading={isRegistering}
          loadingTitle="Creating Sub-Agent account..."
          style={{
            background: "linear-gradient(135deg, #005ca9 0%, #0d9488 100%)",
            color: "#ffffff",
            boxShadow: "0 4px 14px 0 rgba(0, 92, 169, 0.35)",
          }}
          className="h-11 text-sm font-semibold !text-white shadow-md hover:shadow-lg transition-all rounded-xl mt-2 cursor-pointer hover:opacity-95"
        >
          <span className="font-semibold text-white">Complete Sub-Agent Registration</span>
          <ArrowRight className="w-4 h-4 ml-1 text-white" />
        </SubmitButton>
      </form>

      {/* Footer Sign-in Link */}
      <p className="text-center text-sm text-slate-500 font-medium pt-1">
        Already registered?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-bold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SubAgentRegisterForm;
