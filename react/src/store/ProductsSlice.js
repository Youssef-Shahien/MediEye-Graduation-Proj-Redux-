import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//////////////// GetProducts Action //////////////

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3006/products");
      const data = await res.json();
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
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3006/products/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//////////////////// createSlice Reducer ///////////////

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      // GetProducts
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
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
      });
  },
});

export default productsSlice.reducer;
