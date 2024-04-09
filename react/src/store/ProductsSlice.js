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
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMzViZWM4YmIxNmIxZDVhYThlY2JlNGY5OWI5NThhNjQyNDNiMTAyMzhhMTYwNjI5YmY3NWJmNmQ4MTkwMjc2ODFjMTQ2N2M4YzdmMjBhMmMiLCJpYXQiOjE3MTIyOTAyNTEuMzAyNTE5LCJuYmYiOjE3MTIyOTAyNTEuMzAyNTIxLCJleHAiOjE3MjgxMDE0NTEuMjk0MjU2LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.dv3Hh15AIEPYqXb2Fx6qQUofmc2Jst_k6QE9oKYrUkl3mjavp_TPgOl8NNU2mw1ubLaWDwhqEPF7DPiP6gCqw3FrZ9pW43Vvs1WsPetXE3TsWyMTdva-J0xyuZ6jYXmWKCC-NIHXxI92Q2yMaX2ZqqSh7EBV60_-_Ldae1Ihdzhn1pv4xPZF4-fkwPqoL_CbaF7lcSGy6w2JSOe-pyTKczyIAxfKgbqln2mHuV78M1BH00sWJ8Ke8v0ji5qdhWayr5wGVTOQyOmWjBYbUvNQpvwGefdIMpd1tw7QCGije8FAWlyHxKv-zS4zRyYRKYJUE4gBOK5NzawQZHZ7z_jBAZVWCAKFSPDVOHji9PYweZiWxpWj2i7-L2ip9YmcoPN4A4bd54nQp831gSNIQmFuzpZJ5VrJYNPXsYdhgwHxKKWD5-fDmTC4jv2yfEtiSVBaeN68a08AV6fTd5WMyLAe9SklnGz2v0b4pfXNeCIvWZwMAblIjhztasixmAmByYrNJ3iZ31IXtZI8mMJtYrJ2GdR9HGsNPMW33_mb_NPVYIDrj0r2WSqsY354ySI8OA5i_iLN8f5J0rpr7vEHOV4YeH3gp06w3GcW6OO8ZrdMCxKGHfQTTUuuVjCmnPcAqiX4nYl-aj99SnEdM1AskjtuIGPFif0245QrKQ7YXgTPWHM";
const baseURL = `https://7d4f-154-237-97-232.ngrok-free.app/api`;
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
