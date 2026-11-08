import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import {
  IHospitalCountryStatsResponse,
  IGetHospitalsResponse,
  IHospitalQueryParams,
} from "@/types/hospital.type";

export const hospitalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentCountryStats: builder.query<IHospitalCountryStatsResponse, void>({
      query: () => ({
        url: "/hospital/agent-country-stats",
        method: "GET",
      }),
      providesTags: [TagTypes.HOSPITALS],
    }),

    getSubAgentCountryStats: builder.query<
      IHospitalCountryStatsResponse,
      void
    >({
      query: () => ({
        url: "/hospital/sub-agent-country-stats",
        method: "GET",
      }),
      providesTags: [TagTypes.HOSPITALS],
    }),

    getHospitals: builder.query<
      IGetHospitalsResponse,
      IHospitalQueryParams | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && typeof args === "object") {
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
          url: "/hospital/get-hospitals",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.HOSPITALS],
    }),

    getSubAgentHospitals: builder.query<
      IGetHospitalsResponse,
      IHospitalQueryParams | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args && typeof args === "object") {
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
          url: "/hospital/get-sub-agent-hospitals",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.HOSPITALS],
    }),
  }),
});

export const {
  useGetAgentCountryStatsQuery,
  useGetSubAgentCountryStatsQuery,
  useGetHospitalsQuery,
  useGetSubAgentHospitalsQuery,
} = hospitalApi;

