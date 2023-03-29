import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useToken from "../utils/useToken";
import ExpenseCard from "./ExpenseCard";

import store from "./store";
import { useDispatch } from "react-redux";
import { expenseActions } from "./store/Expenses";

const ShowExpenses = (props) => {
  const dispatch = useDispatch();

  const [expenses, setExpenses] = useState([
    ...store.getState().expense.expenses,
  ]);

  const token = useToken();
  const getExpenses = useCallback(async () => {
    const { data } = await axios.get("http://localhost:3000/expenses", {
      headers: {
        Authorization: token,
      },
    });
    props.onChange();
    dispatch(expenseActions.allExpenses({ expenses: data.expense }));
    dispatch(expenseActions.checkExpenses());
    setExpenses(store.getState().expense.expenses);
  }, []);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const expenseCard = expenses.map((expense) => {
    return (
      <ExpenseCard
        key={expense._id}
        expense={expense}
        expenses={expenses}
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
