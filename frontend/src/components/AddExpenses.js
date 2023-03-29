import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddExpenseForm from "./AddExpenseForm";
import store from "./store";
import { useDispatch } from "react-redux";
import { expenseActions } from "./store/Expenses";
import { formActions } from "./store/FormControl";

const AddExpenses = () => {
  const dispatch = useDispatch();
  const [isAddExpense, setIsAddExpense] = useState(
    store.getState().expense.isEdited
  );

  const showExpenseForm = () => {
    dispatch(formActions.opened());
    dispatch(expenseActions.openEdit());
    setIsAddExpense(store.getState().form.isOpened);
  };
  const closeExpenseForm = () => {
    dispatch(formActions.closed());
    setIsAddExpense(store.getState().form.isOpened);
  };
  return (
    <>
      {!isAddExpense && (
        <Button onClick={showExpenseForm} className="position-fixed">
          Add Expense
        </Button>
      )}

      {isAddExpense && <AddExpenseForm onClose={closeExpenseForm} />}
    </>
  );
};

export default AddExpenses;
