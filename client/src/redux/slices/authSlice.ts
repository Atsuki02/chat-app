import { createSlice } from '@reduxjs/toolkit';

export interface authState {
  userId: string | null;
}

const initialState: authState = {
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
