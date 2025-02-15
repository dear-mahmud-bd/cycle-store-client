import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bicycle-store-04-1.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Products"],
  endpoints: () => ({}),
});
