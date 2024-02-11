import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/auth',
    prepareHeaders: (headers) => {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        headers.set('session-id', sessionId);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    validateSession: builder.query({
      query: () => ({
        url: 'session',
        method: 'GET',
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `delete/${userId}`,
        method: 'DELETE',
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useValidateSessionQuery,
  useDeleteUserMutation,
  useLogoutUserMutation,
} = authApi;
