import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { premiumActions } from "./store/premium";

const PremiumBtn = () => {
  const dispatch = useDispatch();
  const premiumBtnhandle = () => {
    dispatch(premiumActions.isPremium());
  };
  return (
    <>
      <Button onClick={premiumBtnhandle}>Buy Premium</Button>
    </>
  );
};

export default PremiumBtn;
