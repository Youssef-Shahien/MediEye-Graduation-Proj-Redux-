import { configureStore } from "@reduxjs/toolkit";
import products from "../store/ProductsSlice";
import users from "../store/UserSlice";
export default configureStore({
  reducer: {
    products,
    users,
  },
});
