import React, { useState, useEffect } from "react";
import { Form, Container, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import useToken from "../utils/useToken";
import useExpenses from "../utils/useExpenses";

const AddExpenses = () => {
  const [values, setValues] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const token = useToken();

  const [isAddExpense, setIsAddExpense] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelect = (eventKey) => {
    setValues({ ...values, category: eventKey });
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    console.log(values);
    await axios.post("http://localhost:3000/addExpense", values, {
      headers: { Authorization: token },
    });
  };

  const showExpenseForm = () => {
    setIsAddExpense(true);
  };

  const closeAddExpenseForm = () => {
    setIsAddExpense(false);
  };

  return (
    <>
      {!isAddExpense && <Button onClick={showExpenseForm}>Add Expense</Button>}
      {isAddExpense && (
        <div className="bg-dark w-25 bg-opacity-25 ">
          <Button className="btn-danger" onClick={closeAddExpenseForm}>
            X
          </Button>
          <Container className="d-flex justify-content-center">
            <Form onSubmit={formSubmitHandle}>
              <Form.Group controlId="amount">
                <Form.Label>Amount: </Form.Label>
                <Form.Control
                  name="amount"
                  placeholder="Enter Expense Amount"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  name="description"
                  placeholder="Enter Expense Description"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="w-25 mb-3" style={{ width: "500px" }}>
                <Form.Label>Category: </Form.Label>
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
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

              <div className="d-flex justify-content-center">
                <Button type="submit">Add Expense</Button>
              </div>
            </Form>
          </Container>
        </div>
      )}
    </>
  );
};

export default AddExpenses;
