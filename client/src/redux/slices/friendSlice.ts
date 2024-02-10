import { createSlice } from '@reduxjs/toolkit';

export interface friendState {
  isFriendProfileOpen: boolean;
}

const initialState: friendState = {
  isFriendProfileOpen: false,
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriendProfileOpen: (state, action) => {
      state.isFriendProfileOpen = action.payload;
    },
  },
});

export const { setFriendProfileOpen } = friendSlice.actions;

export default friendSlice.reducer;
