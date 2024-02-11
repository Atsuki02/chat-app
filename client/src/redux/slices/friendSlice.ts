import { resetState } from './reducer';
import { createSlice } from '@reduxjs/toolkit';
export interface friendState {
  isFriendProfileOpen: boolean;
  selectedFriendId: string;
}

const initialState: friendState = {
  isFriendProfileOpen: false,
  selectedFriendId: '',
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriendProfileOpen: (state, action) => {
      state.isFriendProfileOpen = action.payload;
    },
    setSelectedFriendId: (state, action) => {
      state.selectedFriendId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const { setFriendProfileOpen, setSelectedFriendId } =
  friendSlice.actions;

export default friendSlice.reducer;
