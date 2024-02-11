import { createSlice } from '@reduxjs/toolkit';
import { resetState } from './reducer';

interface User {
  email: string;
  id: string;
  username: string;
  sessionId: string;
}

export interface authState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: authState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
