import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="position-absolute bottom-0 float-right">
      {isLoggedIn && (
        <Button className="btn btn-light float-right" onClick={logoutHandle}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Logout;
