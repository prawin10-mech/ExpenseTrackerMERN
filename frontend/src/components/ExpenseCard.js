import React, { useState, useCallback } from "react";
import axios from "axios";
import AddExpenseForm from "./AddExpenseForm";

const ExpenseCard = React.memo((props) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const expenseEditHandler = useCallback(() => {
    setShowEditForm(true);
  }, []);

  const expenseDeleteHandler = useCallback(async () => {
    const { data } = await axios.post("http://localhost:3000/deleteExpense", {
      id: props.expense._id,
    });
    props.onDelete();
  }, [props]);

  const closeExpenseForm = useCallback(() => {
    setShowEditForm(false);
  }, []);
  return (
    <>
      <div key={props.expense._id} className="d-flex ">
        <h3>{props.expense.amount}-</h3>
        <h3>{props.expense.description}-</h3>
        <h3>{props.expense.category}</h3>
        <button className="rounded" onClick={expenseEditHandler}>
          Edit
        </button>
        <button className="rounded" onClick={expenseDeleteHandler}>
          Delete
        </button>
        {showEditForm && (
          <AddExpenseForm
            expense={props.expense}
            onClose={closeExpenseForm}
            onEdit={props.onEdit}
          />
        )}
      </div>
    </>
  );
});

export default ExpenseCard;
