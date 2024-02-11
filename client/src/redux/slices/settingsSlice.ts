import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './reducer';
export interface settingsState {
  isSettingsOpen: boolean;
  currentSettingScreen: string;
  isAlertDeleteDialogOpen: boolean;
}

const initialState: settingsState = {
  isSettingsOpen: false,
  currentSettingScreen: 'settingsList',
  isAlertDeleteDialogOpen: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsOpen: (state, action) => {
      state.isSettingsOpen = action.payload;
    },
    setCurrentSettingScreen: (state, action) => {
      state.currentSettingScreen = action.payload;
    },
    setAlertDeleteDialogOpen: (state, action) => {
      state.isAlertDeleteDialogOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const {
  setSettingsOpen,
  setCurrentSettingScreen,
  setAlertDeleteDialogOpen,
} = settingsSlice.actions;

export default settingsSlice.reducer;
