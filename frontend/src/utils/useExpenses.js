import axios from "axios";
import useToken from "./useToken";

const useExpenses = async () => {
  const token = useToken();
  const { data } = await axios.get("http://localhost:3000/expenses", {
    headers: {
      Authorization: token,
    },
  });
  return data.expense;
};

export default useExpenses;
