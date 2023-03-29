import { createSlice } from "@reduxjs/toolkit";

const initialState = { premiumUser: false, isDark: false };

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    isPremium(state) {
      state.premiumUser = true;
    },
    isDark(state) {
      console.log(state.isDark);
      state.isDark = !state.isDark;
    },
  },
});

export const premiumActions = premiumSlice.actions;
export default premiumSlice.reducer;
