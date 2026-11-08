/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { ErrorToast, SuccessToast } from "@/helpers/ValidationHelper";
import { setUserInfo, getUserInfo } from "@/helpers/SessionHelper";
import { IParam } from "@/types/global.type";
import {
  IProfileResponse,
  IAgentProfileResponse,
  ISubAgentProfileResponse,
} from "@/types/user.type";
import {
  IGetPatientsResponse,
  IPatientQueryParams,
  TPatientStatus,
} from "@/types/patient.type";
import { SetProfileError } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<
      IGetPatientsResponse,
      IPatientQueryParams | IParam[] | Record<string, any> | void
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
          url: "/user/patients",
          method: "GET",
          params: params,
        };
      },
      providesTags: [TagTypes.USERS],
    }),

    changeUserStatus: builder.mutation<
      { success: boolean; message: string; data: any },
      {
        userId: string;
        status: TPatientStatus | "active" | "blocked" | "pending";
      }
    >({
      query: ({ userId, status }) => ({
        url: `/auth/change-status/${userId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.USERS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          SuccessToast(
            res?.data?.message || "User status updated successfully"
          );
        } catch (err: any) {
          const message =
            err?.error?.data?.message ||
            err?.error?.data?.error ||
            "Failed to update user status";
          ErrorToast(message);
        }
      },
    }),

    getCustomers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/user/customers",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.USERS],
    }),

    getCustomersByShopId: builder.query({
      query: ({ shopId, args }: { shopId: string; args?: IParam[] }) => {
        const params = new URLSearchParams();
        if (args !== undefined && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: `/user/customers/${shopId}`,
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.USERS],
    }),

    getMyProfile: builder.query<IAgentProfileResponse, void>({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: [TagTypes.PROFILE, TagTypes.USERS],
    }),

    getSubAgentProfile: builder.query<ISubAgentProfileResponse, void>({
      query: () => ({
        url: "/user/sub-agent-profile",
        method: "GET",
      }),
      providesTags: [TagTypes.PROFILE, TagTypes.USERS],
    }),

    updateProfile: builder.mutation<
      IProfileResponse,
      FormData | { fullName: string; phone: string; image?: File | null }
    >({
      query: (data) => {
        let body: FormData | any = data;
        if (!(data instanceof FormData)) {
          const formData = new FormData();
          if (data.fullName) formData.append("fullName", data.fullName);
          if (data.phone) formData.append("phone", data.phone);
          if (data.image) formData.append("image", data.image);
          body = formData;
        }
        return {
          url: "/user/update-profile",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result) => {
        if (result?.success) {
          return [TagTypes.PROFILE, TagTypes.USERS, TagTypes.ADMINS];
        }
        return [];
      },
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const updated = res?.data?.data;
          if (updated) {
            const { fullName, email, profileImg, role } = updated;
            const existingInfo = getUserInfo();
            setUserInfo({
              fullName: fullName || existingInfo.fullName,
              email: email || existingInfo.email,
              profileImg:
                profileImg !== undefined
                  ? profileImg
                  : existingInfo.profileImg,
              role: role || existingInfo.role,
            });
          }
          SuccessToast(
            res?.data?.message || "Profile updated successfully"
          );
        } catch (err: any) {
          const status = err?.error?.status;
          const message =
            err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetProfileError("Something Went Wrong"));
            ErrorToast("Something Went Wrong");
            return;
          }
          if (status !== 401) {
            dispatch(SetProfileError(message));
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useChangeUserStatusMutation,
  useGetCustomersQuery,
  useGetCustomersByShopIdQuery,
  useGetMyProfileQuery,
  useGetSubAgentProfileQuery,
  useUpdateProfileMutation,
} = userApi;
