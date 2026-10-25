/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { IParam } from "@/types/global.type";
import { IGetDoctorsResponse, IDoctorQueryParams } from "@/types/doctor.type";
import {
  SetCreateDoctorError,
  SetUpdateDoctorError,
  SetDeleteDoctorError,
} from "./doctorSlice";

export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<
      IGetDoctorsResponse,
      IDoctorQueryParams | IParam[] | Record<string, any> | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && Array.isArray(args) && args.length > 0) {
          args.forEach((item: IParam) => {
            if (
              item.value !== undefined &&
              item.value !== null &&
              item.value !== "" &&
              item.value !== "all"
            ) {
              params.append(item.name, String(item.value));
            }
          });
        } else if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, val]) => {
            if (
              val !== undefined &&
              val !== null &&
              val !== "" &&
              val !== "all"
            ) {
              params.append(key, String(val));
            }
          });
        }
        return {
          url: "/doctor/get-doctors",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.DOCTORS],
    }),

    createDoctor: builder.mutation({
      query: (data) => {
        let body = data;
        if (!(data instanceof FormData) && data?.image instanceof File) {
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
              formData.append(key, data[key]);
            }
          });
          body = formData;
        }
        return {
          url: "/doctor/create-doctor",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.DOCTORS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Doctor added successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Something Went Wrong";
          if (status === 500) {
           // dispatch(SetCreateDoctorError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            //dispatch(SetCreateDoctorError(message));
            ErrorToast(message);
          }
        }
      },
    }),

    updateDoctor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/doctor/update-doctor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.DOCTORS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Doctor updated successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Something Went Wrong";
          if (status === 500) {
            dispatch(SetUpdateDoctorError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            dispatch(SetUpdateDoctorError(message));
            ErrorToast(message);
          }
        }
      },
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctor/delete-doctor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.DOCTORS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          SuccessToast("Doctor deleted successfully");
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Something Went Wrong";
          if (status === 500) {
            dispatch(SetDeleteDoctorError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
          } else {
            dispatch(SetDeleteDoctorError(message));
            ErrorToast(message);
          }
        }
      },
    }),

    updateDoctorApprovalStatus: builder.mutation({
      query: ({ doctorId, ...data }) => ({
        url: `/doctor/approval-status/${doctorId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.DOCTORS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Doctor approval status updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Failed to update doctor approval status";
          ErrorToast(message);
        }
      },
    }),

    changeDoctorStatus: builder.mutation<
      { success: boolean; message: string; data: any },
      {
        doctorId: string;
        status: "published" | "draft" | "archive";
      }
    >({
      query: ({ doctorId, status }) => ({
        url: `/doctor/change-status/${doctorId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.DOCTORS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "Doctor status updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Failed to update doctor status";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateDoctorApprovalStatusMutation,
  useChangeDoctorStatusMutation,
} = doctorApi;
