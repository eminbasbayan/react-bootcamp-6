import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    arttir: (state) => {
      state.count += 1;
    },
    azalt: (state) => {
      state.count -= 1;
    },
  },
});

export default counterSlice.reducer;
