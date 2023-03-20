import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import ProfileComplete from "./pages/Expenses";
import ForgotPassword from "./pages/ForgotPassword";
import NewPasswordUpdate from "./pages/NewPasswordUpdate";
import useLoggedIn from "./utils/useLoggedIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>

          <Route path="/expenses" element={<Expenses />}></Route>

          <Route
            path="/completeProfile"
            exact
            element={<ProfileComplete />}
          ></Route>
          <Route
            path="/forgotPassword"
            exact
            element={<ForgotPassword />}
          ></Route>
          <Route
            path="/newPasswordUpdate/:token/:id"
            element={<NewPasswordUpdate />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
