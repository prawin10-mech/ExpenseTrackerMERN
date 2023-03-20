import React from "react";
import { toast } from "react-toastify";

const usePasswordValid = (password) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  if (password === "") {
    toast.error("Please enter valid Password ", toastOptions);
    return false;
  }
  if (password.length < 8) {
    toast.error("Please must be 8 characters ", toastOptions);
    return false;
  }
  return true;
};

export default usePasswordValid;
