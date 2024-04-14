import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMzViZWM4YmIxNmIxZDVhYThlY2JlNGY5OWI5NThhNjQyNDNiMTAyMzhhMTYwNjI5YmY3NWJmNmQ4MTkwMjc2ODFjMTQ2N2M4YzdmMjBhMmMiLCJpYXQiOjE3MTIyOTAyNTEuMzAyNTE5LCJuYmYiOjE3MTIyOTAyNTEuMzAyNTIxLCJleHAiOjE3MjgxMDE0NTEuMjk0MjU2LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.dv3Hh15AIEPYqXb2Fx6qQUofmc2Jst_k6QE9oKYrUkl3mjavp_TPgOl8NNU2mw1ubLaWDwhqEPF7DPiP6gCqw3FrZ9pW43Vvs1WsPetXE3TsWyMTdva-J0xyuZ6jYXmWKCC-NIHXxI92Q2yMaX2ZqqSh7EBV60_-_Ldae1Ihdzhn1pv4xPZF4-fkwPqoL_CbaF7lcSGy6w2JSOe-pyTKczyIAxfKgbqln2mHuV78M1BH00sWJ8Ke8v0ji5qdhWayr5wGVTOQyOmWjBYbUvNQpvwGefdIMpd1tw7QCGije8FAWlyHxKv-zS4zRyYRKYJUE4gBOK5NzawQZHZ7z_jBAZVWCAKFSPDVOHji9PYweZiWxpWj2i7-L2ip9YmcoPN4A4bd54nQp831gSNIQmFuzpZJ5VrJYNPXsYdhgwHxKKWD5-fDmTC4jv2yfEtiSVBaeN68a08AV6fTd5WMyLAe9SklnGz2v0b4pfXNeCIvWZwMAblIjhztasixmAmByYrNJ3iZ31IXtZI8mMJtYrJ2GdR9HGsNPMW33_mb_NPVYIDrj0r2WSqsY354ySI8OA5i_iLN8f5J0rpr7vEHOV4YeH3gp06w3GcW6OO8ZrdMCxKGHfQTTUuuVjCmnPcAqiX4nYl-aj99SnEdM1AskjtuIGPFif0245QrKQ7YXgTPWHM";
const baseURL = `https://7d4f-154-237-97-232.ngrok-free.app/api`;
//////////////// GetOrders Action //////////////
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${baseURL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
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
//////////////// EditOrders Action //////////////

export const editOrder = createAsyncThunk(
  "products/editProduct",
  async (orderData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    console.log(orderData);
    console.log(orderData.id);
    try {
      const res = await fetch(`${baseURL}/order/${orderData.id}`, {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = await res.json();
      dispatch(getOrders());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//////////////////// createSlice Reducer ///////////////

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], error: null, isLoading: false },
  extraReducers: (builder) => {
    builder
      // GetOrders
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // EditOrder
      .addCase(editOrder.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
