import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProfileComplete from "./ProfileComplete";
import Logout from "../components/Logout";
import AddExpenses from "../components/AddExpenses";
import useLoggedIn from "../utils/useLoggedIn";
import ShowExpenses from "../components/ShowExpenses";

const Expenses = () => {
  //const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");
  const [isClicked, setIsClicked] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const completeProfileHandle = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const isProfileUpdated = async () => {
    const { data } = await axios.get("http://localhost:3000/isProfileUpdated", {
      headers: { Authorization: token },
    });

    if (data.status === true) {
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    // if (!loggedIn) {
    //   navigate("/");
    // }
    isProfileUpdated();
  }, []);

  return (
    <>
      <div className="w-100 d-flex justify-content-between border-bottom">
        <h1 className="mr-auto">Expense Tracker</h1>
        {!isCompleted && (
          <p className="rounded-pill border-primary bg-dark bg-gradient mt-auto border p-1 text-white">
            Please profile is Incomplete.{" "}
            <Button
              className="btn-dark rounded-pill text-primary"
              onClick={completeProfileHandle}
            >
              Complete Now
            </Button>
          </p>
        )}
        {isCompleted && (
          <p className="rounded-pill border-primary bg-dark bg-gradient mt-auto border p-1 text-white">
            Profile completed 100%
            <Button
              className="btn-dark rounded-pill text-primary"
              onClick={completeProfileHandle}
            >
              Edit Profile
            </Button>
          </p>
        )}
      </div>
      <AddExpenses />
      {isClicked && (
        <ProfileComplete onClose={handleClose} onComplete={handleComplete} />
      )}
      <ShowExpenses />
      <Logout />
    </>
  );
};

export default Expenses;
