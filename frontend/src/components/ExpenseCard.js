import React from "react";

const ExpenseCard = (props) => {
  return (
    <div
      key={props.expense._id}
      className="d-flex"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h3>{props.expense.amount}-</h3>
      <h3>{props.expense.description}-</h3>
      <h3>{props.expense.category}</h3>
    </div>
  );
};

export default ExpenseCard;
