import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/user',
    prepareHeaders: (headers) => {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        headers.set('session-id', sessionId);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: (userId) => [{ type: 'User', id: userId }],
    }),
    updateUserDarkMode: builder.mutation({
      query: ({ userId, darkMode }) => ({
        url: `/${userId}/dark-mode`,
        method: 'PATCH',
        body: { darkMode },
      }),
      invalidatesTags: ({ userId }) => [{ type: 'User', id: userId }],
    }),
    updateUserNotifications: builder.mutation({
      query: ({ userId, notifications }) => ({
        url: `/${userId}/notifications`,
        method: 'PATCH',
        body: { notifications },
      }),
      invalidatesTags: ({ userId }) => [{ type: 'User', id: userId }],
    }),
    updateUserProfileImage: builder.mutation({
      query: ({ userId, imageUrl }) => ({
        url: `/${userId}/profile-image`,
        method: 'PATCH',
        body: { imageUrl },
      }),
      invalidatesTags: ({ userId }) => [{ type: 'User', id: userId }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserDarkModeMutation,
  useUpdateUserNotificationsMutation,
  useUpdateUserProfileImageMutation,
} = userApi;
