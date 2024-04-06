import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = "http://localhost:3006/users"
//////////////// GetUsers Action //////////////
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(baseURL);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////// DeleteUsers Action //////////////
export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`${baseURL}/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////// InsertUsers Action //////////////

export const insertUsers = createAsyncThunk(
  "products/insertUsers",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(userData),
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
//////////////// EditUsers Action //////////////

export const editUsers = createAsyncThunk(
  "products/editUsers",
  async (userData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await fetch(`${baseURL}/${userData.id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      dispatch(getUsers());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    isLoading: false,
    userEdit: [],
    userEditReport: false,
  },
  extraReducers: (builder) => {
    builder
      //GetUsers
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // DeleteUsers
      .addCase(deleteUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // InsertUser
      .addCase(insertUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(insertUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // EditUser
      .addCase(editUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //EditUser Temp
      .addCase("Edit_User_Temp", (state, action) => {
        state.userEdit = action.payload;
        state.userEditReport = !state.userEditReport;
      });
  },
});

export default userSlice.reducer;
