/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { IDashboardStatsResponse } from "@/types/dashboard";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<IDashboardStatsResponse, void>({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: [TagTypes.DASHBOARD, TagTypes.SHOPS, TagTypes.USERS],
    }),
  }),
});

export const { useGetStatsQuery } = dashboardApi;
