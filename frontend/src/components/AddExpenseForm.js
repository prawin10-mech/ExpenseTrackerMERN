import React, { useState, useRef, useEffect } from "react";
import { Form, Container, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useToken from "../utils/useToken";
import { useDispatch } from "react-redux";
import { expenseActions } from "./store/Expenses";

const AddExpenseForm = (props) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [values, setValues] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const token = useToken();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelect = (eventKey) => {
    setValues({ ...values, category: eventKey });
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    if (handlerValidation()) {
      await axios.post("http://localhost:3000/addExpense", values, {
        headers: { Authorization: token },
      });
      dispatch(expenseActions.addExpense({ item: { ...values } }));
      setValues({ amount: "", description: "", category: "" });
      formRef.current.reset();
      props.onClose();
    }
  };

  const editFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (handlerValidation()) {
      await axios.post("http://localhost:3000/editExpense", values);
      setValues({ amount: "", description: "", category: "" });
      formRef.current.reset();
      console.log(values);
      props.onClose();
      props.onEdit();
    }
  };

  const handlerValidation = () => {
    const { amount, description, category } = values;
    if (amount === "" || description === "" || category === "") {
      toast.error("please enter all the fields", toastOptions);
      return false;
    }
    return true;
  };

  const closeAddExpenseForm = () => {
    props.onClose();
    dispatch(expenseActions.closeEdit());
  };

  useEffect(() => {
    if (props.expense) {
      setValues({ ...props.expense });
    }
  }, [props.expense]);
  console.log("a");
  return (
    <>
      <div className="position-fixed bg-dark w-25 bg-opacity-25 ">
        <Button className="btn-danger" onClick={closeAddExpenseForm}>
          X
        </Button>
        <Container className="d-flex justify-content-center">
          <Form
            ref={formRef}
            onSubmit={!props.expense ? formSubmitHandle : editFormSubmitHandler}
          >
            <Form.Group controlId="amount">
              <Form.Label>Amount: </Form.Label>
              {!props.expense && (
                <Form.Control
                  name="amount"
                  placeholder="Enter Expense Amount"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              )}
              {props.expense && (
                <Form.Control
                  name="amount"
                  placeholder="Enter Expense Amount"
                  value={values.amount}
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              )}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description: </Form.Label>
              {!props.expense && (
                <Form.Control
                  name="description"
                  placeholder="Enter Expense Description"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              )}
              {props.expense && (
                <Form.Control
                  name="description"
                  placeholder="Enter Expense Description"
                  type="text"
                  value={values.description}
                  onChange={(e) => handleChange(e)}
                />
              )}
            </Form.Group>

            <Form.Group className="w-25 mb-3" style={{ width: "500px" }}>
              <Form.Label>Category: </Form.Label>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {values.category ? values.category : "Select a category"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">Select a category</Dropdown.Item>
                  <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                  <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
                  <Dropdown.Item eventKey="Vegetables">
                    Vegetables
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {props.expense && (
              <div className="d-flex justify-content-center">
                <Button type="submit">Edit Expense</Button>
              </div>
            )}
            {!props.expense && (
              <div className="d-flex justify-content-center">
                <Button type="submit">Add Expense</Button>
              </div>
            )}
          </Form>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddExpenseForm;
