import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (handleValidations()) {
      const { data } = await axios.post(
        "http://localhost:3000/register",
        values
      );
      if (data.status === true) {
        setIsVerified(true);
        console.log(data.user);
      }
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const verifiedUserHandler = async () => {
    const { email, otp } = values;
    const { data } = await axios.post("http://localhost:3000/verifyUser", {
      otp: otp,
      email,
    });
    if (data.status === true) {
      toast.success("User Verified");
      setTimeout(() => navigate("/"), 1000);
    } else {
      toast.error(data.msg, toastOptions);
    }
  };

  const handleValidations = () => {
    const { email, password, confirmPassword } = values;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter valid Email address", toastOptions);
      return false;
    }

    if (password === "") {
      toast.error("Please enter Password ", toastOptions);
      return false;
    }
    if (confirmPassword === "") {
      toast.error("Please enter Confirm Password", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passord and confirm password should be same", toastOptions);
      return false;
    }
    if (password !== "" && password.length < 8) {
      toast.error("Password must be atleast 8 characters", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <Container className="w-25 h-100 bg-light m-auto mt-5">
      <h1 className="text-center">REGISTER</h1>
      <Form onSubmit={formSubmitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        {isVerified && (
          <Form.Group controlId="otp" className="mt-3">
            <Form.Label>OTP: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              name="otp"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
        )}
        <div className="d-flex justify-content-center">
          {isVerified && (
            <Button
              variant="primary"
              className="mt-3"
              onClick={verifiedUserHandler}
            >
              Verify
            </Button>
          )}
        </div>

        <div className="d-flex justify-content-center">
          {!isVerified && (
            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          )}
        </div>

        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Register;
