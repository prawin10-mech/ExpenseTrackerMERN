import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false, token: null, userId: null };

const authSlice = createSlice({
  name: "Auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
    userToken(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
