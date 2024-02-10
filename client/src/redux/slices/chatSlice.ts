import { createSlice } from '@reduxjs/toolkit';

export interface chatState {
  isSideBarDrawerOpen: boolean;
  currentScreen: string;
  isSearchDrawerOpen: boolean;
  searchInput: string;
  currentList: string;
}

const initialState: chatState = {
  isSideBarDrawerOpen: false,
  currentScreen: 'chatsList',
  isSearchDrawerOpen: false,
  searchInput: '',
  currentList: 'chats',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSideBarDrawerOpen: (state, action) => {
      state.isSideBarDrawerOpen = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setSearchDrawerOpen: (state, action) => {
      state.isSearchDrawerOpen = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setCurrentList: (state, action) => {
      state.currentList = action.payload;
    },
  },
});

export const {
  setSideBarDrawerOpen,
  setCurrentScreen,
  setSearchDrawerOpen,
  setSearchInput,
  setCurrentList,
} = chatSlice.actions;

export default chatSlice.reducer;
