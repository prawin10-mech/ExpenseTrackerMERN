import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import ExpenseReducer from "./Expenses";
import FormReducer from "./FormControl";
import PremiumReducer from "./premium";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    expense: ExpenseReducer,
    form: FormReducer,
    premium: PremiumReducer,
  },
});

export default store;
