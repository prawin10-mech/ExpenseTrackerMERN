import React, { useState } from "react";
import axios from "axios";
import AddExpenses from "./AddExpenses";

const ExpenseCard = (props) => {
  // const [isEdit, setIsEdit] = useState(false);
  // const expenseEditHandler = async () => {
  //   const { data } = await axios.post("http://localhost:3000/editExpense", {
  //     amount: 10,
  //   });
  //   props.onEdit();
  // };

  // const expenseEditHandler = async () => {
  //   setIsEdit(true);
  // };

  const expenseDeleteHandler = async () => {
    const { data } = await axios.post("http://localhost:3000/deleteExpense", {
      id: props.expense._id,
    });
    props.onDelete();
  };
  return (
    <>
      <div key={props.expense._id} className="d-flex ">
        <h3>{props.expense.amount}-</h3>
        <h3>{props.expense.description}-</h3>
        <h3>{props.expense.category}</h3>
        {/* <button className="rounded" onClick={expenseEditHandler}>
          Edit
        </button> */}
        <button className="rounded" onClick={expenseDeleteHandler}>
          Delete
        </button>
      </div>
    </>
  );
};

export default ExpenseCard;
