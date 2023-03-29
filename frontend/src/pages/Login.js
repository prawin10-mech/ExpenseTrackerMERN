import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useLoggedIn from "../utils/useLoggedIn";
import { useDispatch } from "react-redux";
import { authActions } from "../components/store/Auth";
import { expenseActions } from "../components/store/Expenses";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const userLoginHandler = async (e) => {
    e.preventDefault();
    if (handlerValidation()) {
      const { data } = await axios.post("http://localhost:3000/login", values);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("token", data.token);
        dispatch(authActions.login());
        dispatch(authActions.userToken({ token: data.token }));
        //dispatch(expenseActions.checkExpenses());
        navigate("/expenses");
      }
    }
  };

  const handlerValidation = () => {
    const { email, password } = values;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter valid Email address", toastOptions);
      return false;
    }

    if (password === "") {
      toast.error("Please enter valid Password ", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error("Please must be 8 characters ", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <Container className="w-25 h-100 bg-light m-auto mt-5">
        <h1 className="text-center">LOGIN</h1>
        <Form onSubmit={userLoginHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div className="text-decoration-none mt-2 text-center">
            <Link to="/forgotPassword">Forgot Password</Link>
          </div>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </div>

          <p>
            Don't have an account ? <Link to="/register">Sign In</Link>
          </p>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
