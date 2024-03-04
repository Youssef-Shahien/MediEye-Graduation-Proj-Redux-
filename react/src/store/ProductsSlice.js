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
      });
  },
});

export default productsSlice.reducer;
