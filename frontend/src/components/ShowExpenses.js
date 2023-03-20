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
    setExpenses([...data.expense]);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const expenseCard = expenses.map((expense) => {
    return (
      <div
        style={{
          display: "flex",
          width: "400px",
          height: "500px",
          minWidth: "400px",
          background: "red",
          margin: "auto",
        }}
      >
        <ExpenseCard key={expense._id} expense={expense} />
      </div>
    );
  });

  return <div>{expenseCard}</div>;
};

export default ShowExpenses;
