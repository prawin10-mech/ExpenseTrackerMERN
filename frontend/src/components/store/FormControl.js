import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpened: false };

const FormSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    opened(state) {
      state.isOpened = true;
    },
    closed(state) {
      state.isOpened = false;
    },
  },
});

export const formActions = FormSlice.actions;

export default FormSlice.reducer;
