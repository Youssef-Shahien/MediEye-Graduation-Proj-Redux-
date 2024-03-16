import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//////////////// GetUsers Action //////////////
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3006/users");
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
      await fetch(`http://localhost:3006/users/${user.id}`, {
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
      const res = await fetch("http://localhost:3006/users", {
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
const userSlice = createSlice({
  name: "users",
  initialState: { users: [], error: null, isLoading: false },
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
      // InsertProduct
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
      });
  },
});

export default userSlice.reducer;
