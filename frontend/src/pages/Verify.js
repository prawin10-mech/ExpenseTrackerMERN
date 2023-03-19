import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const otpSubmitHandler = async () => {
    const { data } = await axios.post("http://localhost:3000/verifyUser", {
      otp: otp,
      email,
    });
    if (data.status === true) {
      toast.success("User Verified");
      setTimeout(() => navigate("/login"), 1000);
    }
  };
  return (
    <div>
      <Container className="w-25 h-100 bg-light m-auto mt-5">
        <h1 className="text-center">REGISTER</h1>
        <Form onSubmit={otpSubmitHandler}>
          <Form.Group controlId="otp">
            <Form.Label>OTP: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mt-3">
              Verify
            </Button>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Verify;
