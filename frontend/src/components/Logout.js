import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/Auth";

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch(authActions);

  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    dispatch(authActions.logout());
  };
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="position-fixed bottom-0 float-right">
      {isLoggedIn && (
        <Button className="btn btn-light float-right" onClick={logoutHandle}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Logout;
