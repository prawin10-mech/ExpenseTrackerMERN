import React from "react";
import { toast } from "react-toastify";

const useEmailValid = (email) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  console.log(email);
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

  if (!emailRegex.test(email)) {
    toast.error("Please enter valid Email address", toastOptions);
    return false;
  }
  return true;
};

export default useEmailValid;
