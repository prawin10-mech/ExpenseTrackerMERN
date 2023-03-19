import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import ProfileComplete from "./pages/Expenses";
import Verify from "./pages/Verify";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/expenses" element={<Expenses />}></Route>
          <Route path="/completeProfile" element={<ProfileComplete />}></Route>
        </Routes>
        <Logout />
      </BrowserRouter>
    </div>
  );
}

export default App;
