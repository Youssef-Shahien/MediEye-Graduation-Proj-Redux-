import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { category: [] },
  extraReducers: {},
});

export default categorySlice.reducer;
