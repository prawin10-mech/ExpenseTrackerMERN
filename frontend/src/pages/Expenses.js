import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";

import ProfileComplete from "./ProfileComplete";
import Logout from "../components/Logout";
import AddExpenses from "../components/AddExpenses";
import ShowExpenses from "../components/ShowExpenses";
import store from "../components/store";
import PremiumBtn from "../components/premiumBtn";
import { expenseActions } from "../components/store/Expenses";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isClicked, setIsClicked] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [premium, setPremium] = useState(false);

  const completeProfileHandle = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  dispatch(expenseActions.checkExpenses());

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const premiumHandler = () => {
    console.log(premium);
    console.log("A");
    setPremium(store.getState().expense.premiumBtn);
    console.log(premium);
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
    premiumHandler();
  }, [store.getState().expense.expenses]);

  useEffect(() => {
    isProfileUpdated();
    console.log(store.getState());
  }, [isClicked]);

  console.log(premium);

  return (
    <>
      <div className="w-100 d-flex justify-content-between border-bottom">
        <h1 className="mr-auto text-white">EXPENSE TRACKER</h1>

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
      {!premium && <AddExpenses />}
      {isClicked && (
        <ProfileComplete onClose={handleClose} onComplete={handleComplete} />
      )}
      <ShowExpenses onChange={premiumHandler} />
      {premium && (
        <>
          {console.log("hello")}
          <PremiumBtn />
        </>
      )}
      <Logout />
    </>
  );
};

export default Expenses;
