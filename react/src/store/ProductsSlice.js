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
//////////////// InsertProducts Action //////////////

export const insertProducts = createAsyncThunk(
  "products/insertProducts",
  async (productData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3006/products", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
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
    console.log(productData);
    console.log(productData.id);
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(
        `http://localhost:3006/products/${productData.id}`,
        {
          method: "PUT",
          body: JSON.stringify(productData),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
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
