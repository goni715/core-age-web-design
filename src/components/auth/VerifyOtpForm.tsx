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
import { KeyRound, ArrowLeft, RotateCcw, Mail, Edit2 } from "lucide-react";
import { isLoggedIn } from "@/helpers/SessionHelper";
import CustomIconInput from "@/components/common/CustomIconInput";

const VerifyOtpForm = () => {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

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
      } else {
        setIsEditingEmail(true);
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
        <div className="w-13 h-13 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100 shadow-xs">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1.5">
          Verify OTP
        </h2>
        <p className="text-slate-500 text-sm">
          Enter the 6-digit verification code sent to your email.
        </p>
      </div>

      {/* Email Display / Change Box */}
      {watchedEmail && !isEditingEmail ? (
        <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl p-3.5 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate font-semibold text-slate-900">
              {watchedEmail}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingEmail(true)}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Change
          </button>
        </div>
      ) : null}

      {/* Error Alert */}
      {VerifyAccountError && (
        <ErrorAlert
          message={VerifyAccountError}
          onClose={() => dispatch(SetVerifyAccountError(""))}
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email input if not provided or editing */}
        {(!watchedEmail || isEditingEmail) && (
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
        <div className="flex flex-col items-center gap-2">
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
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  autoFocus
                >
                  <InputOTPGroup className="gap-2 sm:gap-2.5">
                    <InputOTPSlot
                      index={0}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border border-slate-200 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100 bg-white"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border border-slate-200 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100 bg-white"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border border-slate-200 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100 bg-white"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border border-slate-200 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100 bg-white"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border border-slate-200 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100 bg-white"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold rounded-xl border border-slate-200 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-100 bg-white"
                    />
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
          className="h-11 text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-xl"
        >
          Verify Code
        </SubmitButton>

        {/* Resend & Back Actions */}
        <div className="flex flex-col items-center justify-center pt-2 gap-3.5 text-center">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending}
              className="text-blue-600 font-bold hover:underline outline-none disabled:text-slate-400 disabled:no-underline cursor-pointer transition-colors"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend Code"}
            </button>
          </p>

          <Link
            href="/login"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
