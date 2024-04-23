import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// https://15d5-197-121-138-71.ngrok-free.app/api/category/add
//////////////////////////////////////////
// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiN2IzYzBhZmZhZDczZTRkMjM1MDc0NDFkMmM0YTE2NmNjMDRmYmJhMzM0ZTlkZTdkOGI3MzE2YmQ4OGFkMGE4YmYwNjA0YjJkOTA3NTdjNjkiLCJpYXQiOjE3MTMyNjQ4NzIuMTg2OTUxLCJuYmYiOjE3MTMyNjQ4NzIuMTg2OTUzLCJleHAiOjE3MjkwNzYwNzIuMTc1ODI1LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.WdqmhNsDx2_leKwriMCkU_8TKYvKrHMKZug77T5t3KNEyPZkqoF0HVs0v8niFgh6waGMw9v5vtlXyHHRwck6YaX2Go3VADVkH1ZDU57kmP4U-8FtCMGvkWz7f2VXMdVn_fth_2DAcmfzpnFSuDxIxcCNOrGBFRqDgdARilBt19pl0m8ikEKqG0u_3y7vOqoe8i0qMqUliPLDMjcZoo-TD-NqzQaiqzHxR4ldflI_PVmvdrHjtpaNvgw9xjhGF2RE1xlrN5BbJnn23baZg0DFvpmaQvW3h2KcPSI2eESy4Dgm5caLuZS0KrnLYtQarhkRB89_eSdNdmoCWnYhIcA9WztYKF165QfKjJbshxJn0gbFs4Ge5EbQ3Qw00h6exaujsJtpVi7j3t1woUmebXS9ODeLIeNnD3XGNMQQzSD7jXOHtgl_pdAuoYjgi8xtfDMTmYglNcipStiH6IFP3hsqQfQ-w5GoAS4vmTVqa2FZE5a_5pBBy5y1KvidWqF_x9pcxpLyG1p6BZtqT45PtvUzHEvWoZjmbn59h2YUp-8MuHVvCXJMuSBclHJs_L4w6YZdXrN_nFqlJUckOop9YcyG2pBi3q-R8cR3rGe4E0se8U30vMvGoBcWmC2C1XF1_9yNqBKxT29IBtXjnA3g2yqSvqAU_Ogyhbsy-weam0ep8M4";
const baseURL = `https://e39c-156-221-18-113.ngrok-free.app/api`;
// const baseURL = "http://localhost:3006";
//////////////// GetCategory Action //////////////
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const token = getState().auth.userToken;
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
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const token = getState().auth.userToken;
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
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const token = getState().auth.userToken;

      // Create FormData object
      const formData = new FormData();
      // Assuming all properties exist in categoryData, add checks if they are optional
      formData.append("id", categoryData.id);
      formData.append("title", categoryData.title);
      formData.append("image", categoryData.image);

      console.log(formData);
      const res = await fetch(`${baseURL}/category/add`, {
        method: "POST",
        body: formData,
        headers: {
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
//////////////// EditCategory Action //////////////
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (categoryData, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;
    console.log(categoryData);
    try {
      const token = getState().auth.userToken;
      const formData = new FormData();
      formData.append("title", categoryData.title);
      if (categoryData.image) {
        formData.append("image", categoryData.image);
      } else {
        formData.append("image", null);
      }
      const res = await fetch(`${baseURL}/category/edit/${categoryData.id}`, {
        method: "POST",
        body: formData,
        headers: {
          // "content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      if (!categoryData.image) {
        data.image = null;
      }
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
