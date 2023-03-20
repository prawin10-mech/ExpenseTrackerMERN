import { useState, useEffect } from "react";
import axios from "axios";
import useToken from "./useToken";

const useProfileCompleted = async () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const token = useToken();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3000/isProfileUpdated", {
      headers: { Authorization: token },
    });

    if (data.status === true) {
      setIsCompleted(true);
    }
  };

  return isCompleted;
};

export default useProfileCompleted;
