"use client";

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type TRegisterValues } from "@/schemas/auth.schema";
import Link from "next/link";
import ErrorAlert from "@/components/alert/ErrorAlert";
import { useRegisterPartnerMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SetRegisterError } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { User, Briefcase, Mail, Phone, Lock, ArrowRight, UserPlus, Info } from "lucide-react";
import { isLoggedIn } from "@/helpers/SessionHelper";

const RegisterForm = () => {
  const [registerPartner, { isLoading: isRegistering }] =
    useRegisterPartnerMutation();

  const { RegisterError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    dispatch(SetRegisterError(""));
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      const res = await registerPartner({
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        agencyName: data.agencyName.trim(),
        password: data.password,
      });

      if (
        "data" in res &&
        (res?.data?.success ||
          res?.data?.statusCode === 200 ||
          res?.data?.statusCode === 201)
      ) {
        router.push("/login?role=sub-agent");
      }
    } catch {
      // Error handled in onQueryStarted
    }
  };

  return (
    <div className="space-y-5">
      {/* Badge & Title for Referral Partner Sign Up */}
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Referral Partner Registration</span>
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Register as Referral Partner
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          Create your Referral Partner account to refer patients for international hospital care, track treatment journeys, and receive referral commissions.
        </p>
      </div>

      {RegisterError && (
        <ErrorAlert
          message={RegisterError}
          onClose={() => dispatch(SetRegisterError(""))}
        />
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
              placeholder="e.g. Alif Islam"
              {...register("fullName")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          {errors.fullName && (
            <p className="text-rose-500 text-[11px]">{errors.fullName.message}</p>
          )}
        </div>

        {/* Agency / Clinic / Organisation Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Agency / Clinic Name
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Alif Agency"
              {...register("agencyName")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          {errors.agencyName && (
            <p className="text-rose-500 text-[11px]">{errors.agencyName.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="alif@example.com"
              {...register("email")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          {errors.email && (
            <p className="text-rose-500 text-[11px]">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              placeholder="01766666666"
              {...register("phone")}
              disabled={isRegistering}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
          {errors.password && (
            <p className="text-rose-500 text-[11px]">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isRegistering}
          className="w-full py-2.5 px-4 bg-[#005ca9] hover:bg-[#004e90] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 pt-2"
        >
          <span>{isRegistering ? "Creating account..." : "Register as Referral Partner"}</span>
          {!isRegistering && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      {/* Switch to Login / Referral Invitation */}
      <div className="pt-2 space-y-2 text-center text-xs text-slate-500">
        <div>
          Already have an account?{" "}
          <Link href="/login?role=sub-agent" className="text-blue-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>

        <div>
          Joining with an invitation token?{" "}
          <Link href="/referral" className="text-emerald-700 font-bold hover:underline">
            Register with Invitation Code
          </Link>
        </div>

        {/* Notice for Channel Partners */}
        <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2 text-left">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Channel Partner Note:</strong> Channel Partner accounts are created by administration only. If you are a Channel Partner, please{" "}
            <Link href="/login?role=agent" className="text-blue-600 font-semibold hover:underline">
              Sign In here
            </Link>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
