import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api_url = "http://localhost:3006/category";
//////////////// GetCategory Action //////////////
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(api_url);
      const data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////// DeleteCategory Action //////////////
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`${api_url}/${item.id}`, {
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
//////////////// InsertCategory Action //////////////
export const insertCategory = createAsyncThunk(
  "category/insertCategory",
  async (categoryData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(api_url, {
        method: "POST",
        body: JSON.stringify(categoryData),
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
//////////////// EditCategory Action //////////////
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (categoryData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${api_url}/${categoryData.id}`, {
        method: "PUT",
        body: JSON.stringify(categoryData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      dispatch(getCategory());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    error: null,
    isLoading: false,
    catEdit: [],
    catEditReport: false,
  },
  extraReducers: (builder) => {
    builder
      //Get Categories
      .addCase(getCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Categories
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = state.category.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Insert Categories
      .addCase(insertCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category.push(action.payload);
      })
      .addCase(insertCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Edit Categories
      .addCase(editCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // EditCategories
      .addCase("Edit_Categories_Temp", (state, action) => {
        state.catEditReport = !state.editReport;
        state.catEdit = action.payload;
      });
  },
});

export default categorySlice.reducer;
