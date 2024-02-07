import { createSlice } from '@reduxjs/toolkit';

export interface chatState {
  isDrawerOpen: boolean;
  currentScreen: string;
}

const initialState: chatState = {
  isDrawerOpen: false,
  currentScreen: 'friendList',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setDrawerOpen, setCurrentScreen } = chatSlice.actions;

export default chatSlice.reducer;
