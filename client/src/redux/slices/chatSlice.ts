import { resetState } from './reducer';
import { createSlice } from '@reduxjs/toolkit';
export interface chatState {
  isSideBarDrawerOpen: boolean;
  currentScreen: string;
  isSearchDrawerOpen: boolean;
  searchInput: string;
  currentList: string;
  selectedChatRoom: string;
  messageInput: string;
  isGroupProfileOpen: boolean;
}

const initialState: chatState = {
  isSideBarDrawerOpen: false,
  currentScreen: 'chatsList',
  isSearchDrawerOpen: false,
  searchInput: '',
  currentList: 'chats',
  selectedChatRoom: '',
  messageInput: '',
  isGroupProfileOpen: false,
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
    setSelectedChatRoom: (state, action) => {
      state.selectedChatRoom = action.payload;
    },
    setMessageInput: (state, action) => {
      state.messageInput = action.payload;
    },
    setGroupProfileOpen: (state, action) => {
      state.isGroupProfileOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const {
  setSideBarDrawerOpen,
  setCurrentScreen,
  setSearchDrawerOpen,
  setSearchInput,
  setCurrentList,
  setSelectedChatRoom,
  setMessageInput,
  setGroupProfileOpen,
} = chatSlice.actions;

export default chatSlice.reducer;
