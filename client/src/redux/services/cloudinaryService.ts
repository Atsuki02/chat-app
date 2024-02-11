import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cloudinaryApi = createApi({
  reducerPath: 'cloudinaryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ secure_url: string }, FormData>({
      query: (imageFormData) => ({
        url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        method: 'POST',
        body: imageFormData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = cloudinaryApi;
