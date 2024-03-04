import { configureStore } from "@reduxjs/toolkit";
import products from "../store/ProductsSlice";
export default configureStore({
  reducer: {
    products,
  },
});
