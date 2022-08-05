import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginSlice";
import registerReducer from "../reducers/registerSlice";
import recordReducer from "../reducers/recordSlice";
import filterReducer from "../reducers/filterSlice";
import arrangeSlice from "../reducers/arrangeSlice";
import YearFilter from "../reducers/investmentSlice";

const store = configureStore({
  reducer: {
    logins: loginReducer,
    register: registerReducer,
    records: recordReducer,
    filter: filterReducer,
    arrange: arrangeSlice,
    year: YearFilter,
  },
});

export default store;
