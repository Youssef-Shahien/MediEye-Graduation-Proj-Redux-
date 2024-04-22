import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiMDU3ZDMyYmMwMDYwZGE1NzNkN2Q3YjIzNWQ3MDVlOWIxMzg0ZTAwYzVkMDVmZTU2N2QzYjc0MzU4MTg4MzgyY2U2M2M1NWE0YjBhNjIzMjUiLCJpYXQiOjE3MTMxMzE0MzkuNzk1NTA1LCJuYmYiOjE3MTMxMzE0MzkuNzk1NTA4LCJleHAiOjE3Mjg5NDI2MzkuNzg0NzM0LCJzdWIiOiI2OCIsInNjb3BlcyI6W119.UnKzmrIGPPPHf8IEYvfIe5pzJuLUokp6DEKVt7VD_ZiCEJfTWtpeZpH7SFdA0g4CPwFh1IonV5Lh3VUirtVl4sS2FFrS-Qzg9LI341xHXVVlkgwTQLaWCTZObACTtUTnPDstgN-wVemiwUoP1sI8Oi_BHMNwmmw5vEZGr3Yrhnm4QW9w5P80D1B2wQfASe7iI44z1Gmchcj8JBRg4B0qMWIGdS4C4Xgt6ACi303z0tDrdhwyHbhEeJ72bFqCAvwSIKsfcHSsefGSaJ9jldCLwvnsVPwhp2Z4haqUvN4JKKT5KbepExbGtLrUTdHfBpc1qupSNK3xQElCR8Kk6X6f21OwWv8ykC23hklC2Jg9vvpGkCx1_27nLW45uV6PPU7yxZD2hSzgtQXeNBNHnoBVeu73W-LFqw1Tb6B1b2XbNjdk865zW7w3ZXZsUFWDp_xmyTZaN-an94VE_nflKTWRSYvNgUvA_joYUL2ewLtfDUyUsyYpMBzv985MwoXkidCCW43KPvtz1eHHPxhzIkOkGHEOyKXd3qWx-kS27ErgGrTMWv3exTr59nd5MScaIlPX6nj5nJLfiBZqk1Rwe2Sx6mgk9sG7F4wwWOMmiz1YJ_AI0uL1TKh6Mpga4CsS24TzAkB6z3omaSKSlzYyaa6EFPBtU9Dln_JlYB6Nnj0DICE";
const baseURL = `https://2f10-156-218-5-35.ngrok-free.app/api`;
//////////////// GetOrders Action //////////////
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue ,getState } = thunkAPI;
    try {
      const token = getState().auth.userToken
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
    const { rejectWithValue, dispatch ,getState } = thunkAPI;
    console.log(orderData);
    console.log(orderData.id);
    try {
      const token = getState().auth.userToken
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
