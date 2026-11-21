/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import {
  IDashboardStatsResponse,
  ISubAgentDashboardStatsResponse,
  IAgentDashboardStatsResponse,
  IAgentMonthlyReferralsResponse,
} from "@/types/dashboard";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<IDashboardStatsResponse, void>({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: [TagTypes.DASHBOARD, TagTypes.SHOPS, TagTypes.USERS],
    }),

    getSubAgentStats: builder.query<ISubAgentDashboardStatsResponse, void>({
      query: () => ({
        url: "/dashboard/sub-agent-stats",
        method: "GET",
      }),
      providesTags: [TagTypes.DASHBOARD, TagTypes.PATIENT_CASES],
    }),

    getAgentStats: builder.query<IAgentDashboardStatsResponse, void>({
      query: () => ({
        url: "/dashboard/agent-stats",
        method: "GET",
      }),
      providesTags: [TagTypes.DASHBOARD, TagTypes.PATIENT_CASES, TagTypes.USERS],
    }),

    getAgentMonthlyReferrals: builder.query<
      IAgentMonthlyReferralsResponse,
      { year?: number } | void
    >({
      query: (params) => ({
        url: "/dashboard/agent-monthly-referrals",
        method: "GET",
        params: params?.year ? { year: params.year } : undefined,
      }),
      providesTags: [TagTypes.DASHBOARD, TagTypes.PATIENT_CASES],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetSubAgentStatsQuery,
  useGetAgentStatsQuery,
  useGetAgentMonthlyReferralsQuery,
} = dashboardApi;
