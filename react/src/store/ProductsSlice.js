import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const getProducts = createAsyncThunk(
//   "products/getProducts",
//   async (_, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const response = await axios.get(`${baseURL}/products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "ngrok-skip-browser-warning": "true",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.log(error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

///////////////////////////////////////////////////////////////////////////////////////////////////////
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiMDU3ZDMyYmMwMDYwZGE1NzNkN2Q3YjIzNWQ3MDVlOWIxMzg0ZTAwYzVkMDVmZTU2N2QzYjc0MzU4MTg4MzgyY2U2M2M1NWE0YjBhNjIzMjUiLCJpYXQiOjE3MTMxMzE0MzkuNzk1NTA1LCJuYmYiOjE3MTMxMzE0MzkuNzk1NTA4LCJleHAiOjE3Mjg5NDI2MzkuNzg0NzM0LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.UnKzmrIGPPPHf8IEYvfIe5pzJuLUokp6DEKVt7VD_ZiCEJfTWtpeZpH7SFdA0g4CPwFh1IonV5Lh3VUirtVl4sS2FFrS-Qzg9LI341xHXVVlkgwTQLaWCTZObACTtUTnPDstgN-wVemiwUoP1sI8Oi_BHMNwmmw5vEZGr3Yrhnm4QW9w5P80D1B2wQfASe7iI44z1Gmchcj8JBRg4B0qMWIGdS4C4Xgt6ACi303z0tDrdhwyHbhEeJ72bFqCAvwSIKsfcHSsefGSaJ9jldCLwvnsVPwhp2Z4haqUvN4JKKT5KbepExbGtLrUTdHfBpc1qupSNK3xQElCR8Kk6X6f21OwWv8ykC23hklC2Jg9vvpGkCx1_27nLW45uV6PPU7yxZD2hSzgtQXeNBNHnoBVeu73W-LFqw1Tb6B1b2XbNjdk865zW7w3ZXZsUFWDp_xmyTZaN-an94VE_nflKTWRSYvNgUvA_joYUL2ewLtfDUyUsyYpMBzv985MwoXkidCCW43KPvtz1eHHPxhzIkOkGHEOyKXd3qWx-kS27ErgGrTMWv3exTr59nd5MScaIlPX6nj5nJLfiBZqk1Rwe2Sx6mgk9sG7F4wwWOMmiz1YJ_AI0uL1TKh6Mpga4CsS24TzAkB6z3omaSKSlzYyaa6EFPBtU9Dln_JlYB6Nnj0DICE";
const baseURL = `https://2603-154-237-75-97.ngrok-free.app/api`;
//////////////// GetProducts Action //////////////
// export const getProducts = createAsyncThunk(
//   "products/getProducts",
//   async (_, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const res = await fetch("http://localhost:3006/products");
//       const data = await res.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${baseURL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      console.log(data.products);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////// DeleteProducts Action //////////////

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await fetch(`${baseURL}/product/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////// InsertProducts Action //////////////

export const insertProducts = createAsyncThunk(
  "products/insertProducts",
  async (productData, thunkAPI) => {
    console.log(productData);
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${baseURL}/product/add`, {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////// EditProduct Action //////////////

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (productData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    console.log(productData);
    console.log(productData.id);
    try {
      const res = await fetch(`${baseURL}/product/edit/${productData.id}`, {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      dispatch(getProducts());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//////////////////// createSlice Reducer ///////////////

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
    edit: [],
    editReport: false,
  },
  extraReducers: (builder) => {
    builder
      // GetProducts
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // DeleteProducts
      .addCase(deleteProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // InsertProduct
      .addCase(insertProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(insertProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // EditProduct
      .addCase(editProduct.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // EditProduct
      .addCase("Edit_Product_Temp", (state, action) => {
        state.editReport = !state.editReport;
        state.edit = action.payload;
      });
  },
});

export default productsSlice.reducer;
