import { createSlice } from '@reduxjs/toolkit';

export interface settingsState {
  isSettingsOpen: boolean;
  currentSettingScreen: string;
}

const initialState: settingsState = {
  isSettingsOpen: false,
  currentSettingScreen: 'settingsList',
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
  },
});

export const { setSettingsOpen, setCurrentSettingScreen } =
  settingsSlice.actions;

export default settingsSlice.reducer;
