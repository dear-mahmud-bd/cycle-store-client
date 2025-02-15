import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (token) => ({
        url: "/orders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserOrders: builder.query({
      query: ({ email, token }) => ({
        url: `/orders/${email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, newStatus, token }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { status: newStatus },
      }),
    }),
    createOrder: builder.mutation({
      query: ({ orderData, token }) => ({
        url: "/payment/initiate",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: orderData,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
} = productApi;
