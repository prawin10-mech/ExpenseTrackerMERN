import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const NewPasswordUpdate = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const { id, token } = useParams();

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

  const NewPasswordUpdate = async (e) => {
    e.preventDefault();
    if (validateHandler()) {
      const { data } = await axios.post(
        `http://localhost:3000/updatePassword/${token}/${id}`,
        { id, password: values.password }
      );
      if (data.status) {
        toast.success(data.msg, toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const validateHandler = () => {
    const { password, confirmPassword } = values;

    if (password === "") {
      toast.error("Please enter a password");
      return false;
    }

    if (confirmPassword === "") {
      toast.error("Please enter a confirm password");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return false;
    }

    return true;
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center w-25 h-100 bg-light m-auto mt-5">
        <h2 className="mt-lg-4 text-center">Forgot Password</h2>
        <Form onSubmit={NewPasswordUpdate} className="mt-lg-4">
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your new Password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new Password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div className="text-center">
            <Button className="mt-lg-4" type="submit">
              Update Password
            </Button>
          </div>
          <div className="text-decoration-none mt-2 text-center">
            <p>
              Already have account ?<Link to="/">Login</Link>
            </p>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default NewPasswordUpdate;
