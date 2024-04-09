import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// https://15d5-197-121-138-71.ngrok-free.app/api/category/add
//////////////////////////////////////////
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMzViZWM4YmIxNmIxZDVhYThlY2JlNGY5OWI5NThhNjQyNDNiMTAyMzhhMTYwNjI5YmY3NWJmNmQ4MTkwMjc2ODFjMTQ2N2M4YzdmMjBhMmMiLCJpYXQiOjE3MTIyOTAyNTEuMzAyNTE5LCJuYmYiOjE3MTIyOTAyNTEuMzAyNTIxLCJleHAiOjE3MjgxMDE0NTEuMjk0MjU2LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.dv3Hh15AIEPYqXb2Fx6qQUofmc2Jst_k6QE9oKYrUkl3mjavp_TPgOl8NNU2mw1ubLaWDwhqEPF7DPiP6gCqw3FrZ9pW43Vvs1WsPetXE3TsWyMTdva-J0xyuZ6jYXmWKCC-NIHXxI92Q2yMaX2ZqqSh7EBV60_-_Ldae1Ihdzhn1pv4xPZF4-fkwPqoL_CbaF7lcSGy6w2JSOe-pyTKczyIAxfKgbqln2mHuV78M1BH00sWJ8Ke8v0ji5qdhWayr5wGVTOQyOmWjBYbUvNQpvwGefdIMpd1tw7QCGije8FAWlyHxKv-zS4zRyYRKYJUE4gBOK5NzawQZHZ7z_jBAZVWCAKFSPDVOHji9PYweZiWxpWj2i7-L2ip9YmcoPN4A4bd54nQp831gSNIQmFuzpZJ5VrJYNPXsYdhgwHxKKWD5-fDmTC4jv2yfEtiSVBaeN68a08AV6fTd5WMyLAe9SklnGz2v0b4pfXNeCIvWZwMAblIjhztasixmAmByYrNJ3iZ31IXtZI8mMJtYrJ2GdR9HGsNPMW33_mb_NPVYIDrj0r2WSqsY354ySI8OA5i_iLN8f5J0rpr7vEHOV4YeH3gp06w3GcW6OO8ZrdMCxKGHfQTTUuuVjCmnPcAqiX4nYl-aj99SnEdM1AskjtuIGPFif0245QrKQ7YXgTPWHM";
const base_url = "https://7d4f-154-237-97-232.ngrok-free.app";
const baseURL = `${base_url}/api`;
// const baseURL = "http://localhost:3006";
//////////////// GetCategory Action //////////////
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${baseURL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
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
      await fetch(`${baseURL}/category/${item.id}`, {
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
//////////////// InsertCategory Action //////////////
export const insertCategory = createAsyncThunk(
  "category/insertCategory",
  async (categoryData, thunkAPI) => {
    console.log(categoryData);
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${baseURL}/category/add`, {
        method: "POST",
        body: JSON.stringify(categoryData),
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log(data);
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
    console.log(categoryData);
    try {
      const res = await fetch(`${baseURL}/category/edit/${categoryData.id}`, {
        method: "POST",
        body: JSON.stringify(categoryData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
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
        state.category = action.payload.categories;
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
        console.log(action.payload);
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
        state.catEditReport = !state.catEditReport;
        state.catEdit = action.payload;
      });
  },
});

export default categorySlice.reducer;
