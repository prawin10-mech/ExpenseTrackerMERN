import React from "react";
import ExpenseContext from "./expense_context";

const ExpenseProvider = (props) => {
  const addItems = (item) => {};
  const expenseCtx = {
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
  };
  return (
    <ExpenseContext.Provider value={expenseCtx}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
