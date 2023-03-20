import { useState, useEffect } from "react";

const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const user = localStorage.getItem("token");
  useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return isLoggedIn;
};

export default useLoggedIn;
