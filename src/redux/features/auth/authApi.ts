import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/auth/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserByEmail: builder.query({
      query: ({ email, token }) => ({
        url: `/auth/${email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),
    updateUserName: builder.mutation({
      query: ({ email, name, token }) => ({
        url: `/auth/${email}/update-name`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name },
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: ({ email, oldPassword, newPassword, token }) => ({
        url: "/auth/change-password",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { email, oldPassword, newPassword },
      }),
    }),
    updateUserBlockStatus: builder.mutation({
      query: ({ userId, isBlocked, token }) => ({
        url: "/auth/update-block-status",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { userId, isBlocked },
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role, token }) => ({
        url: "/auth/update-role",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { userId, role },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useUpdateUserNameMutation,
  useChangePasswordMutation,
  useUpdateUserBlockStatusMutation,
  useUpdateUserRoleMutation,
} = authApi;
