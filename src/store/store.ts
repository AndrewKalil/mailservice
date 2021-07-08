import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/UserStore";
import authReducer from "./modules/AuthStore";
import requestReducer from "./modules/RequestStore";
import ruleReducer from "./modules/RuleStore";
import emailReducer from "./modules/EmailStore";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    request: requestReducer,
    rule: ruleReducer,
    email: emailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
