import { createSlice } from '@reduxjs/toolkit';

export interface createGroupState {
  isCreateDrawerOpen: boolean;
  selectedMembers: string[];
  currentScreen: string;
  groupNameInput: string;
}

const initialState: createGroupState = {
  isCreateDrawerOpen: false,
  selectedMembers: [],
  currentScreen: 'selectMembers',
  groupNameInput: '',
};

const createGroupSlice = createSlice({
  name: 'createGroup',
  initialState,
  reducers: {
    setCreateDrawerOpen: (state, action) => {
      state.isCreateDrawerOpen = action.payload;
    },
    addSelectedMember: (state, action) => {
      state.selectedMembers.push(action.payload);
    },
    removeSelectedMember: (state, action) => {
      state.selectedMembers = state.selectedMembers.filter(
        (memberId) => memberId !== action.payload,
      );
    },
    setSelectedMember: (state, action) => {
      state.selectedMembers = action.payload;
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
    setGroupNameInput: (state, action) => {
      state.groupNameInput = action.payload;
    },
  },
});

export const {
  setCreateDrawerOpen,
  addSelectedMember,
  removeSelectedMember,
  setSelectedMember,
  setCurrentScreen,
  setGroupNameInput,
} = createGroupSlice.actions;

export default createGroupSlice.reducer;
