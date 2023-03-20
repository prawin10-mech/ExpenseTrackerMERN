import React from "react";

const expense_context = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default expense_context;
