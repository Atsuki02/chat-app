import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';
import settingsSlice from './slices/settingsSlice';
import createGroupSlice from './slices/createGroupSlice';
import friendSlice from './slices/friendSlice';
import authSlice from './slices/authSlice';
import { authApi } from './services/authService';

const store = configureStore({
  reducer: {
    chat: chatSlice,
    settings: settingsSlice,
    createGroup: createGroupSlice,
    friend: friendSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
