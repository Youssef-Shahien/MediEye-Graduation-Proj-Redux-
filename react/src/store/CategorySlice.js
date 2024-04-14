import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// https://15d5-197-121-138-71.ngrok-free.app/api/category/add
//////////////////////////////////////////
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiMDU3ZDMyYmMwMDYwZGE1NzNkN2Q3YjIzNWQ3MDVlOWIxMzg0ZTAwYzVkMDVmZTU2N2QzYjc0MzU4MTg4MzgyY2U2M2M1NWE0YjBhNjIzMjUiLCJpYXQiOjE3MTMxMzE0MzkuNzk1NTA1LCJuYmYiOjE3MTMxMzE0MzkuNzk1NTA4LCJleHAiOjE3Mjg5NDI2MzkuNzg0NzM0LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.UnKzmrIGPPPHf8IEYvfIe5pzJuLUokp6DEKVt7VD_ZiCEJfTWtpeZpH7SFdA0g4CPwFh1IonV5Lh3VUirtVl4sS2FFrS-Qzg9LI341xHXVVlkgwTQLaWCTZObACTtUTnPDstgN-wVemiwUoP1sI8Oi_BHMNwmmw5vEZGr3Yrhnm4QW9w5P80D1B2wQfASe7iI44z1Gmchcj8JBRg4B0qMWIGdS4C4Xgt6ACi303z0tDrdhwyHbhEeJ72bFqCAvwSIKsfcHSsefGSaJ9jldCLwvnsVPwhp2Z4haqUvN4JKKT5KbepExbGtLrUTdHfBpc1qupSNK3xQElCR8Kk6X6f21OwWv8ykC23hklC2Jg9vvpGkCx1_27nLW45uV6PPU7yxZD2hSzgtQXeNBNHnoBVeu73W-LFqw1Tb6B1b2XbNjdk865zW7w3ZXZsUFWDp_xmyTZaN-an94VE_nflKTWRSYvNgUvA_joYUL2ewLtfDUyUsyYpMBzv985MwoXkidCCW43KPvtz1eHHPxhzIkOkGHEOyKXd3qWx-kS27ErgGrTMWv3exTr59nd5MScaIlPX6nj5nJLfiBZqk1Rwe2Sx6mgk9sG7F4wwWOMmiz1YJ_AI0uL1TKh6Mpga4CsS24TzAkB6z3omaSKSlzYyaa6EFPBtU9Dln_JlYB6Nnj0DICE";
const base_url = "https://2603-154-237-75-97.ngrok-free.app";
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
