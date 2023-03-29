import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { premiumActions } from "./store/premium";

const DarkMode = () => {
  const dispatch = useDispatch();
  const [dark, setDark] = useState(false);
  const handleDarkMode = () => {
    setDark(!dark);
    dispatch(premiumActions.isDark());
  };
  return <Button onClick={handleDarkMode}>{dark ? "Light" : "Dark"}</Button>;
};

export default DarkMode;
