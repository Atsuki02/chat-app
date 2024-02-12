import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';
import settingsSlice from './slices/settingsSlice';
import createGroupSlice from './slices/createGroupSlice';
import friendSlice from './slices/friendSlice';
import authSlice from './slices/authSlice';
import { authApi } from './services/authService';
import { userApi } from './services/userService';
import { cloudinaryApi } from './services/cloudinaryService';
import { chatApi } from './services/chatService';

const store = configureStore({
  reducer: {
    chat: chatSlice,
    settings: settingsSlice,
    createGroup: createGroupSlice,
    friend: friendSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      cloudinaryApi.middleware,
      chatApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
