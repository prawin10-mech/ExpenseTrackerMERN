import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../utils/useToken";
import ExpenseCard from "./ExpenseCard";

const ShowExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  const token = useToken();
  const getExpenses = async () => {
    const { data } = await axios.get("http://localhost:3000/expenses", {
      headers: {
        Authorization: token,
      },
    });
    setExpenses(data.expense);
  };

  useEffect(() => {
    getExpenses();
  }, [expenses]);

  const expenseCard = expenses.map((expense) => {
    return (
      <ExpenseCard
        key={expense._id}
        expense={expense}
        onDelete={getExpenses}
        onEdit={getExpenses}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "400px",
        color: "#fff",
        minWidth: "400px",
        background: "grey",
        margin: "auto",
      }}
    >
      {expenseCard}
    </div>
  );
};

export default ShowExpenses;
