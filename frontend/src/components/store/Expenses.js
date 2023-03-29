import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  isAdded: null,
  isEdited: null,
  editedExpense: [],
  premiumBtn: null,
};

const expenseSlice = createSlice({
  name: "Expenses",
  initialState,
  reducers: {
    allExpenses(state, action) {
      state.expenses = action.payload.expenses;
      state.isAdded = true;
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload.item];
      state.isAdded = false;
    },
    openEdit(state) {
      state.isEdited = true;
    },
    closeEdit(state) {
      state.isEdited = false;
    },
    checkExpenses(state) {
      const amount = state.expenses.reduce(
        (accumulator, currentValue) => accumulator + +currentValue.amount,
        0
      );
      state.premiumBtn = amount >= 10000;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
