import { resetState } from './reducer';
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
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const { setFriendProfileOpen } = friendSlice.actions;

export default friendSlice.reducer;
