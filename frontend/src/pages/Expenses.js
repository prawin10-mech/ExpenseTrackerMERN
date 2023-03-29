import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import ProfileComplete from "./ProfileComplete";
import Logout from "../components/Logout";
import AddExpenses from "../components/AddExpenses";
import ShowExpenses from "../components/ShowExpenses";
import store from "../components/store";
import PremiumBtn from "../components/premiumBtn";
import { expenseActions } from "../components/store/Expenses";
import DarkMode from "../components/DarkMode";

const Expenses = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isClicked, setIsClicked] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  // const [premium, setPremium] = useState(false);
  const premium = useSelector((state) => state.expense.premiumBtn);
  const isPremium = useSelector((state) => state.premium.premiumUser);

  const completeProfileHandle = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  dispatch(expenseActions.checkExpenses());

  const isProfileUpdated = async () => {
    const { data } = await axios.get("http://localhost:3000/isProfileUpdated", {
      headers: { Authorization: token },
    });

    if (data.status === true) {
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    isProfileUpdated();
    console.log(store.getState());
  }, [isClicked]);

  console.log(isPremium);

  return (
    <>
      <div className="w-100 d-flex justify-content-between border-bottom">
        <h1 className="text-danger mr-auto">EXPENSE TRACKER</h1>
        {premium && isPremium && <DarkMode />}

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
      <ShowExpenses />
      {premium && <>{!isPremium && <PremiumBtn />}</>}
      <Logout />
    </>
  );
};

export default Expenses;
