import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ProfileComplete = (props) => {
  const token = localStorage.getItem("token");
  const [values, setValues] = useState({
    name: "",
    profile: "",
  });

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

  const profileCompleteHandler = async (e) => {
    e.preventDefault();
    if (handlerValidation()) {
      const { data } = await axios.post(
        "http://localhost:3000/updateProfile",
        values,
        { headers: { Authorization: token } }
      );

      if (data.status === true) {
        toast.success(data.msg, toastOptions);
      }

      setTimeout(() => {
        props.onComplete();
        props.onClose();
      }, 8000);
    }
  };

  const getUserData = async () => {
    const { data } = await axios.get("http://localhost:3000/getUserDetails", {
      headers: { Authorization: token },
    });
    console.log(data);
    setValues({
      name: data._doc.name,
      profile: data._doc.profile,
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handlerValidation = () => {
    const { name, profile } = values;
    if (name === "" || name === null || name === undefined) {
      toast.error("Please enter a name", toastOptions);
      return false;
    }
    if (profile === "" || profile === null || profile === undefined) {
      toast.error("Please enter a profile URL", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <div>
      <Container className="w-50 h-25 bg-light float-end">
        <Button
          onClick={props.onClose}
          className="border-danger btn-light text-danger fw-bold float-end border"
        >
          Cancel
        </Button>
        <h3>Contact Details: </h3>

        <Form onSubmit={profileCompleteHandler}>
          <Form.Group controlId="name">
            <Form.Label>Full Name: </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              placeholder="Enter Full Name"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="profile">
            <Form.Label>Profile Photo Url: </Form.Label>
            <Form.Control
              type="text"
              name="profile"
              value={values.profile}
              placeholder="Enter Profile Photo Url"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default ProfileComplete;
