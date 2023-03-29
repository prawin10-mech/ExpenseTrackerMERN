import { Button } from "react-bootstrap";

const PremiumBtn = () => {
  const premiumBtnhandle = () => {
    console.log("premium Btn clicked");
  };
  return (
    <>
      <Button onClick={premiumBtnhandle}>Buy Premium</Button>
    </>
  );
};

export default PremiumBtn;
