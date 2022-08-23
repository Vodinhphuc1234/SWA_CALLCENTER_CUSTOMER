import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

export default store = configureStore({
  reducer: {
    nav: navReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
