import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useEmailValid from "../utils/useEmailValid";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validateHandler = useEmailValid(email);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    if (validateHandler) {
      const { data } = await axios.post(
        "http://localhost:3000/forgotPassword",
        {
          email,
        }
      );
      console.log(data.url);
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center w-25 h-100 bg-light m-auto mt-5">
        <h2 className="mt-lg-4 text-center">Forgot Password</h2>
        <Form onSubmit={forgotPasswordHandler} className="mt-lg-4">
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div className="text-center">
            <Button className="mt-lg-4" type="submit">
              Send Link
            </Button>
          </div>
          <div className="text-decoration-none mt-2 text-center">
            <p>
              Already have account ?<Link to="/">Sign in</Link>
            </p>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
