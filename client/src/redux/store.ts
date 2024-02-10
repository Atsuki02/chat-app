import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chatSlice';
import settingsSlice from './slices/settingsSlice';

import createGroupSlice from './slices/createGroupSlice';
import friendSlice from './slices/friendSlice';

const store = configureStore({
  reducer: {
    chat: chatSlice,
    settings: settingsSlice,
    createGroup: createGroupSlice,
    friend: friendSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
