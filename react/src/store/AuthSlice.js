import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
//user token
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiMDU3ZDMyYmMwMDYwZGE1NzNkN2Q3YjIzNWQ3MDVlOWIxMzg0ZTAwYzVkMDVmZTU2N2QzYjc0MzU4MTg4MzgyY2U2M2M1NWE0YjBhNjIzMjUiLCJpYXQiOjE3MTMxMzE0MzkuNzk1NTA1LCJuYmYiOjE3MTMxMzE0MzkuNzk1NTA4LCJleHAiOjE3Mjg5NDI2MzkuNzg0NzM0LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.UnKzmrIGPPPHf8IEYvfIe5pzJuLUokp6DEKVt7VD_ZiCEJfTWtpeZpH7SFdA0g4CPwFh1IonV5Lh3VUirtVl4sS2FFrS-Qzg9LI341xHXVVlkgwTQLaWCTZObACTtUTnPDstgN-wVemiwUoP1sI8Oi_BHMNwmmw5vEZGr3Yrhnm4QW9w5P80D1B2wQfASe7iI44z1Gmchcj8JBRg4B0qMWIGdS4C4Xgt6ACi303z0tDrdhwyHbhEeJ72bFqCAvwSIKsfcHSsefGSaJ9jldCLwvnsVPwhp2Z4haqUvN4JKKT5KbepExbGtLrUTdHfBpc1qupSNK3xQElCR8Kk6X6f21OwWv8ykC23hklC2Jg9vvpGkCx1_27nLW45uV6PPU7yxZD2hSzgtQXeNBNHnoBVeu73W-LFqw1Tb6B1b2XbNjdk865zW7w3ZXZsUFWDp_xmyTZaN-an94VE_nflKTWRSYvNgUvA_joYUL2ewLtfDUyUsyYpMBzv985MwoXkidCCW43KPvtz1eHHPxhzIkOkGHEOyKXd3qWx-kS27ErgGrTMWv3exTr59nd5MScaIlPX6nj5nJLfiBZqk1Rwe2Sx6mgk9sG7F4wwWOMmiz1YJ_AI0uL1TKh6Mpga4CsS24TzAkB6z3omaSKSlzYyaa6EFPBtU9Dln_JlYB6Nnj0DICE";
const baseURL = `https://2603-154-237-75-97.ngrok-free.app/api`;
// const navigate = useNavigate();
// Login Action
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(userData);
      try {
      const response = await fetch(`${baseURL}/login-email`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await response.json();
      localStorage.setItem("userToken", token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register Action
export const register = createAsyncThunk(
  "auth/register",
  (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = fetch(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.success = true; // Set isAuthenticated to true upon successful login
        state.userToken = userToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Register
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
