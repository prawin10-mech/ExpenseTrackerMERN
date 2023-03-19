import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import ProfileComplete from "./pages/Expenses";
import Logout from "./components/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import NewPasswordUpdate from "./pages/NewPasswordUpdate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/expenses" exact element={<Expenses />}></Route>
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
            path="/newPasswordUpdate/:email"
            element={<NewPasswordUpdate />}
          ></Route>
        </Routes>
        <Logout />
      </BrowserRouter>
    </div>
  );
}

export default App;
