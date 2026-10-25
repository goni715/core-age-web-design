"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type TRegisterValues } from "@/schemas/auth.schema";
import CustomIconInput from "@/components/common/CustomIconInput";
import SubmitButton from "@/components/common/SubmitButton";
import Link from "next/link";
import ErrorAlert from "@/components/alert/ErrorAlert";
import { useRegisterAgentMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetRegisterError } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { User, Briefcase, Mail, Phone, Lock } from "lucide-react";
import { isLoggedIn } from "@/helpers/SessionHelper";

const RegisterForm = () => {
  const [registerAgent, { isLoading: isRegistering }] =
    useRegisterAgentMutation();

  const { RegisterError } = useAppSelector((state) => state.auth);
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
    dispatch(SetRegisterError(""));
  }, [dispatch]);

  const {
    handleSubmit,
    control,
  } = useForm<TRegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      agencyName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TRegisterValues> = async (data) => {
    dispatch(SetRegisterError(""));
    try {
      const res = await registerAgent({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        agencyName: data.agencyName,
        password: data.password,
      });

      if (
        "data" in res &&
        (res?.data?.success ||
          res?.data?.statusCode === 200 ||
          res?.data?.statusCode === 201)
      ) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("verifyEmail", data.email);
        }
        router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      }
    } catch {
      // Error handled in onQueryStarted via authApi and authSlice
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1.5">
          Agent Sign Up
        </h2>
        <p className="text-slate-500 text-sm">
          Create your partner account to start referring patients.
        </p>
      </div>

      {RegisterError && (
        <ErrorAlert
          message={RegisterError}
          onClose={() => dispatch(SetRegisterError(""))}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomIconInput
          label="Full Name"
          name="fullName"
          control={control}
          placeholder="e.g. Roho Xeb"
          icon={User}
          disabled={isRegistering}
          required
        />

        <CustomIconInput
          label="Agency / Business Name"
          name="agencyName"
          control={control}
          placeholder="e.g. Goni Tech Agency"
          icon={Briefcase}
          disabled={isRegistering}
          required
        />

        <CustomIconInput
          label="Email Address"
          name="email"
          type="email"
          control={control}
          placeholder="e.g. agent@example.com"
          icon={Mail}
          disabled={isRegistering}
          autoComplete="email"
          required
        />

        <CustomIconInput
          label="Phone Number"
          name="phone"
          type="tel"
          control={control}
          placeholder="e.g. 01766666666"
          icon={Phone}
          disabled={isRegistering}
          autoComplete="tel"
          required
        />

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

        <p className="text-xs text-slate-500 leading-relaxed pt-1">
          By creating an account, you agree to 3S Medicare&apos;s{" "}
          <Link href="#" className="text-blue-600 font-semibold hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-600 font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <SubmitButton
          isLoading={isRegistering}
          loadingTitle="Creating account..."
          className="h-11 text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all rounded-xl mt-2"
        >
          Create Account
        </SubmitButton>
      </form>

      <p className="text-center text-sm text-slate-500 font-medium pt-2">
        Already have an account?{" "}
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

export default RegisterForm;
