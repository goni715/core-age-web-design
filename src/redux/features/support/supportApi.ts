import { apiSlice } from "../api/apiSlice";
import TagTypes from "@/constants/tagType.constant";
import { IParam } from "@/types/global.type";
import {
  ISupportResponse,
  ISubmitSupportPayload,
  ISubmitSupportResponse,
} from "@/types/support.type";

export const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupports: builder.query<ISupportResponse, IParam[] | undefined>({
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
          url: "/support/my-supports",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.SUPPORTS],
    }),

    submitSupport: builder.mutation<
      ISubmitSupportResponse,
      ISubmitSupportPayload
    >({
      query: (body) => ({
        url: "/support/submit",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagTypes.SUPPORTS],
    }),

    getSubAgentSupports: builder.query<
      ISupportResponse,
      IParam[] | undefined | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined && Array.isArray(args) && args.length > 0) {
          args.forEach((item: IParam) => {
            if (item.value) {
              params.append(item.name, item.value);
            }
          });
        }
        return {
          url: "/support/sub-agent-supports",
          method: "GET",
          params: params,
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.SUPPORTS],
    }),
  }),
});

export const {
  useGetSupportsQuery,
  useGetSubAgentSupportsQuery,
  useSubmitSupportMutation,
} = supportApi;
