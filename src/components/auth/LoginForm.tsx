"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Mail, Lock } from "lucide-react";
import { loginSchema } from "@/schemas/auth.schema";
import CustomIconInput from "@/components/common/CustomIconInput";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import SubmitButton from "@/components/common/SubmitButton";
import Link from "next/link";
import ErrorAlert from "@/components/alert/ErrorAlert";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetLoginError } from "@/redux/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { isLoggedIn } from "@/helpers/SessionHelper";

type TFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { LoginError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (isLoggedIn()) {
      router.replace(callbackUrl);
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

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    dispatch(SetLoginError(""));
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });

      if ("data" in res && (res?.data?.success || res?.data?.data?.accessToken)) {
        if (data.isRememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        router.push(callbackUrl);
      }
    } catch {
      // Error handled in onQueryStarted via authApi and authSlice
    }
  };

  return (
    <div className="space-y-4">
      {LoginError && (
        <ErrorAlert
          message={LoginError}
          onClose={() => dispatch(SetLoginError(""))}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <CustomIconInput
          label="Email Address"
          name="email"
          type="email"
          control={control}
          placeholder="agent@example.com"
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

        <div className="flex items-center justify-between text-sm">
          <CustomCheckbox
            control={control}
            name="isRememberMe"
            label="Remember me"
            disabled={isLoading}
          />
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <SubmitButton
          isLoading={isLoading}
          loadingTitle="Signing in..."
          className="h-11 text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-xl"
        >
          Sign In
        </SubmitButton>
      </form>
    </div>
  );
};

export default LoginForm;
