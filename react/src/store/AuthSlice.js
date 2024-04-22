import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//user token
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const baseURL = `https://2f10-156-218-5-35.ngrok-free.app/api`;
// const navigate = useNavigate();
// Login Action
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log({ email, password });
    try {
      const response = await fetch(`${baseURL}/login-email`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await response.json();
      localStorage.setItem("userToken", data.userToken);
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
    console.log(userData)
    const { rejectWithValue } = thunkAPI;
    try {
      const response = fetch(`${baseURL}/register-pharmacy`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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
    userInfo: [],
    userToken: 'null',
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
        console.log(action.payload)
        state.isLoading = false;
        state.userInfo = action.payload;
        state.success = true; // Set isAuthenticated to true upon successful login
        state.userToken = action.payload.token;
        console.log(state.userToken)
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
      })
      //AddUser Info
      .addCase("Add_User_info", (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      });
  },
});

export default authSlice.reducer;
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     console.log({ email, password });
//     try {
//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//       const { data } = await axios.post(
//         `${baseURL}/login-email`,
//         { email, password },
//         config
//       )
//       // store user's token in local storage
//       localStorage.setItem('userToken', data.userToken)
//       return data
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );