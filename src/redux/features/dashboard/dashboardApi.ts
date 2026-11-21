/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import {
  IDashboardStatsResponse,
  ISubAgentDashboardStatsResponse,
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
  }),
});

export const { useGetStatsQuery, useGetSubAgentStatsQuery } = dashboardApi;
