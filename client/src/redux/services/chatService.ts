import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/chat',
    prepareHeaders: (headers) => {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        headers.set('session-id', sessionId);
      }
      return headers;
    },
  }),
  tagTypes: ['ChatRoom'],
  endpoints: (builder) => ({
    getChatRoomById: builder.query({
      query: (chatRoomId) => `/${chatRoomId}`,
      providesTags: (chatRoomId) => [{ type: 'ChatRoom', id: chatRoomId }],
    }),
  }),
});

export const { useGetChatRoomByIdQuery } = chatApi;
