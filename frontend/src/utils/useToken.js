import { useDispatch } from "react-redux";
import { authActions } from "../components/store/Auth";

const useToken = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  if (token) {
    dispatch(authActions.login());
    dispatch(authActions.userToken({ token }));
  }
  return token;
};
export default useToken;
