/* eslint-disable @next/next/no-location-assign-relative-destination */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { apiSlice } from "../api/apiSlice";
import {
  SetChangePasswordError,
  SetForgotError,
  SetLoginError,
  SetRegisterError,
  SetVerifyAccountError,
  SetResetPasswordError,
  SetVerifyOtpError,
} from "./authSlice";
import TagTypes from "@/constants/tagType.constant";
import { removeToken, setToken, setUserInfo, removeUserInfo, clearSession } from "@/helpers/SessionHelper";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login-agent",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.accessToken;
          removeToken();
          setToken(token);
          const { fullName, email, profileImg, role } = res?.data?.data || {};
          setUserInfo({ fullName, email, profileImg, role });
          SuccessToast("Login Successfull");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetLoginError("Something Went Wrong"));
          }
          else {
            dispatch(SetLoginError(message));
          }
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          clearSession();
          SuccessToast("Successfully logged out!");
          window.location.href = "/login";
        } catch (err: any) {
          clearSession();
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          } else if (status !== 401) {
            ErrorToast(message);
          }
          window.location.href = "/login";
        }
      },
    }),
    logoutFromAll: builder.mutation({
      query: () => ({
        url: "/auth/logout-all",
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          clearSession();
          SuccessToast("Successfully logged out from all devices!");
          window.location.href = "/login";
        } catch (err: any) {
          clearSession();
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          } else if (status !== 401) {
            ErrorToast(message);
          }
          window.location.href = "/login";
        }
      },
    }),
    forgotPasswordSendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password/send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("OTP sent successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetForgotError("Something Went Wrong"));
          }
          else {
            dispatch(SetForgotError(message));
          }
        }
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password/send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("OTP ressent successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetVerifyOtpError("Something Went Wrong"));
          }
          else {
            dispatch(SetVerifyOtpError(message));
          }
        }
      },
    }),
    forgotPasswordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password/verify-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Otp is verified successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetVerifyOtpError("Something Went Wrong"));
          }
          else {
            dispatch(SetVerifyOtpError(message));
          }
        }
      },
    }),
    forgotPasswordResendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-pass-send-otp",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("OTP is sent successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
            ErrorToast(message);
          }
        }
      },
    }),
    forgotPasswordReset: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password/set-new-password`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Password is reset successfully!");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetResetPasswordError("Something Went Wrong"));
          }
          else {
            dispatch(SetResetPasswordError(message));
          }
        }
      },
    }),
    changeStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/change-status/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.USERS];
        }
        return [];
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Update Success");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          }
          else {
            ErrorToast(message);
          }
        }
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          SuccessToast("Password is updated successfully");
          const token = res?.data?.data?.accessToken;
          removeToken();
          setToken(token);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetChangePasswordError("Something Went Wrong"));
            return;
          }
          if (status !== 401) {
            dispatch(SetChangePasswordError(message));
          }
        }
      },
    }),
    registerAgent: builder.mutation({
      query: (data) => ({
        url: "/auth/register-agent",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(res?.data?.message || "Registration successful! OTP sent to your email.");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Registration failed. Please try again.";
          if (status === 500) {
            dispatch(SetRegisterError("Something Went Wrong"));
          } else {
            dispatch(SetRegisterError(message));
          }
        }
      },
    }),
    verifyAccount: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.accessToken;
          if (token) {
            removeToken();
            setToken(token);
            const { fullName, email, profileImg, role } = res?.data?.data || {};
            setUserInfo({ fullName, email, profileImg, role });
          }
          SuccessToast(res?.data?.message || "Account verified successfully!");
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Verification failed. Invalid or expired code.";
          if (status === 500) {
            dispatch(SetVerifyAccountError("Something Went Wrong"));
          } else {
            dispatch(SetVerifyAccountError(message));
          }
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterAgentMutation,
  useVerifyAccountMutation,
  useLogoutMutation,
  useLogoutFromAllMutation,
  useForgotPasswordSendOtpMutation,
  useResendOtpMutation,
  useForgotPasswordResendOtpMutation,
  useForgotPasswordVerifyOtpMutation,
  useForgotPasswordResetMutation,
  useChangeStatusMutation,
  useChangePasswordMutation,
} = authApi;
