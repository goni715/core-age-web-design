"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyAccountSchema,
  type TVerifyAccountValues,
} from "@/schemas/auth.schema";
import SubmitButton from "@/components/common/SubmitButton";
import Link from "next/link";
import ErrorAlert from "@/components/alert/ErrorAlert";
import {
  useVerifyAccountMutation,
  useResendOtpMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetVerifyAccountError } from "@/redux/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { KeyRound, ArrowLeft, RotateCcw, Mail, ShieldCheck } from "lucide-react";
import { isLoggedIn } from "@/helpers/SessionHelper";
import CustomIconInput from "@/components/common/CustomIconInput";

const VerifyOtpForm = () => {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  const [resendCooldown, setResendCooldown] = useState(60);

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const { VerifyAccountError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/");
    }
  }, [router]);

  // Clear errors on initial mount
  useEffect(() => {
    dispatch(SetVerifyAccountError(""));
  }, [dispatch]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const { handleSubmit, control, setValue, watch } =
    useForm<TVerifyAccountValues>({
      resolver: zodResolver(verifyAccountSchema),
      defaultValues: {
        email: emailFromQuery,
        otp: "",
      },
    });

  // Prepopulate email from sessionStorage if not in query
  useEffect(() => {
    if (!emailFromQuery && typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("verifyEmail");
      if (storedEmail) {
        setValue("email", storedEmail);
      }
    }
  }, [emailFromQuery, setValue]);

  const watchedEmail = watch("email");

  const onSubmit: SubmitHandler<TVerifyAccountValues> = async (data) => {
    dispatch(SetVerifyAccountError(""));
    try {
      const res = await verifyAccount({
        email: data.email,
        otp: data.otp,
      });

      if ("data" in res && (res?.data?.success || res?.data?.data?.accessToken)) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("verifyEmail");
        }
        router.push("/");
      }
    } catch {
      // Error handled in onQueryStarted via authApi and authSlice
    }
  };

  const handleResend = async () => {
    if (!watchedEmail || resendCooldown > 0 || isResending) return;
    dispatch(SetVerifyAccountError(""));
    try {
      await resendOtp({ email: watchedEmail });
      setResendCooldown(60);
    } catch {
      // Handled in onQueryStarted
    }
  };

  return (
    <div className="space-y-6">
      {/* Icon & Heading */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/10 via-blue-50 to-teal-500/10 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
            <KeyRound className="w-7 h-7 text-blue-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
          Verify OTP
        </h2>
        <p className="text-slate-500 text-sm max-w-xs">
          Enter the 6-digit verification code sent to your email address.
        </p>

        {/* Clean Email Badge - "Change" button removed as requested */}
        {watchedEmail && (
          <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/70 border border-blue-100/80 text-xs text-slate-700 max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate font-semibold text-slate-800">
              {watchedEmail}
            </span>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {VerifyAccountError && (
        <ErrorAlert
          message={VerifyAccountError}
          onClose={() => dispatch(SetVerifyAccountError(""))}
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email input if not provided */}
        {!watchedEmail && (
          <CustomIconInput
            label="Email Address"
            name="email"
            type="email"
            control={control}
            placeholder="agent@example.com"
            icon={Mail}
            disabled={isLoading}
            required
          />
        )}

        {/* shadcn InputOTP Field */}
        <div className="flex flex-col items-center gap-2.5">
          <label className="text-xs sm:text-sm font-semibold text-slate-700 text-center">
            Verification Code
          </label>

          <Controller
            control={control}
            name="otp"
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col items-center gap-2">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  inputMode="numeric"
                  value={field.value}
                  onChange={(val) => {
                    const numericOnly = val.replace(/\D/g, "");
                    field.onChange(numericOnly);
                  }}
                  disabled={isLoading}
                  autoFocus
                >
                  <InputOTPGroup className="gap-2 sm:gap-2.5">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-[46px] h-[54px] sm:w-[52px] sm:h-[60px] text-xl sm:text-2xl font-bold rounded-xl sm:rounded-2xl border-2 border-slate-300 bg-white text-slate-900 shadow-2xs transition-all duration-150 hover:border-slate-400 data-[active=true]:border-blue-600 data-[active=true]:ring-4 data-[active=true]:ring-blue-500/15 data-[active=true]:shadow-md data-[active=true]:scale-105"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {error && (
                  <p className="text-destructive text-xs font-medium mt-1 text-center animate-in fade-in duration-150">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          loadingTitle="Verifying code..."
          className="h-12 text-sm font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 rounded-xl"
        >
          Verify Code
        </SubmitButton>

        {/* Resend & Back Actions */}
        <div className="flex flex-col items-center justify-center pt-1 gap-3.5 text-center">
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            {resendCooldown > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                Resend code in{" "}
                <strong className="text-slate-900 tabular-nums font-semibold">
                  {resendCooldown}s
                </strong>
              </span>
            ) : (
              <div className="flex items-center gap-1.5">
                <span>Didn&apos;t receive the code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-blue-600 font-bold hover:underline outline-none cursor-pointer inline-flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isResending ? "Sending..." : "Resend Code"}
                </button>
              </div>
            )}
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>
        </div>

        {/* Subtle Help Hint */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Can&apos;t find the verification email? Check your spam or promotions folder.
          </p>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
