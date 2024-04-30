import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

///////////////////////////////////////////////////////////////////////////////////////////////////////
// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiN2IzYzBhZmZhZDczZTRkMjM1MDc0NDFkMmM0YTE2NmNjMDRmYmJhMzM0ZTlkZTdkOGI3MzE2YmQ4OGFkMGE4YmYwNjA0YjJkOTA3NTdjNjkiLCJpYXQiOjE3MTMyNjQ4NzIuMTg2OTUxLCJuYmYiOjE3MTMyNjQ4NzIuMTg2OTUzLCJleHAiOjE3MjkwNzYwNzIuMTc1ODI1LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.WdqmhNsDx2_leKwriMCkU_8TKYvKrHMKZug77T5t3KNEyPZkqoF0HVs0v8niFgh6waGMw9v5vtlXyHHRwck6YaX2Go3VADVkH1ZDU57kmP4U-8FtCMGvkWz7f2VXMdVn_fth_2DAcmfzpnFSuDxIxcCNOrGBFRqDgdARilBt19pl0m8ikEKqG0u_3y7vOqoe8i0qMqUliPLDMjcZoo-TD-NqzQaiqzHxR4ldflI_PVmvdrHjtpaNvgw9xjhGF2RE1xlrN5BbJnn23baZg0DFvpmaQvW3h2KcPSI2eESy4Dgm5caLuZS0KrnLYtQarhkRB89_eSdNdmoCWnYhIcA9WztYKF165QfKjJbshxJn0gbFs4Ge5EbQ3Qw00h6exaujsJtpVi7j3t1woUmebXS9ODeLIeNnD3XGNMQQzSD7jXOHtgl_pdAuoYjgi8xtfDMTmYglNcipStiH6IFP3hsqQfQ-w5GoAS4vmTVqa2FZE5a_5pBBy5y1KvidWqF_x9pcxpLyG1p6BZtqT45PtvUzHEvWoZjmbn59h2YUp-8MuHVvCXJMuSBclHJs_L4w6YZdXrN_nFqlJUckOop9YcyG2pBi3q-R8cR3rGe4E0se8U30vMvGoBcWmC2C1XF1_9yNqBKxT29IBtXjnA3g2yqSvqAU_Ogyhbsy-weam0ep8M4";
const baseURL = `https://2c1b-154-239-26-178.ngrok-free.app/api`;
//////////////// GetProducts Action //////////////
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const token = getState().auth.userToken;
      const res = await fetch(`${baseURL}/products-Pharmacy`, {
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
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const token = getState().auth.userToken;
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
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    console.log(productData);

    try {
      // Move token retrieval inside the try block, in case it's asynchronous or might throw an error
      const token = getState().auth.userToken;

      const formData = new FormData();
      // Assuming all properties exist in productData, add checks if they are optional
      formData.append("id", productData.id);
      formData.append("category_id", productData.category_id);
      formData.append("name", productData.name);
      formData.append("code", productData.code);
      formData.append("description", productData.description);
      formData.append("effective_material", productData.effective_material);
      formData.append("price", productData.price);
      formData.append("discount", productData.discount);
      formData.append("image", productData.image);

      const res = await fetch(`${baseURL}/product/add`, {
        method: "POST",
        body: formData,
        headers: {
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
//////////////// EditProduct Action //////////////

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (productData, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;
    console.log(productData);
    console.log(productData.id);
    try {
      const token = getState().auth.userToken;
      const formData = new FormData();
      formData.append("category_id", productData.category_id);
      formData.append("name", productData.name);
      formData.append("code", productData.code);
      formData.append("description", productData.description);
      formData.append("effective_material", productData.effective_material);
      formData.append("price", productData.price);
      formData.append("discount", productData.discount);
      if (productData.image) {
        formData.append("image", productData.image);
      } else {
        formData.append("image", null);
      }

      const res = await fetch(`${baseURL}/product/edit/${productData.id}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      if (!productData.image) {
        data.image = null;
      }
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
        console.log(action.payload);
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
