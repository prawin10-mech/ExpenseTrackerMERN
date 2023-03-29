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
      console.log(state.isOpened);
      state.isOpened = false;
      console.log(state.isOpened);
    },
  },
});

export const formActions = FormSlice.actions;

export default FormSlice.reducer;
