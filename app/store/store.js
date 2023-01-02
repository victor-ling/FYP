import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import taskReducer from "./taskReducer";
export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
