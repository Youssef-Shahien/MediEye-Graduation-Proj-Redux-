import { configureStore } from "@reduxjs/toolkit";
import products from "../store/ProductsSlice";
import users from "../store/UserSlice";
import category from "../store/CategorySlice";
export default configureStore({
  reducer: {
    products,
    users,
    category,
  },
});
