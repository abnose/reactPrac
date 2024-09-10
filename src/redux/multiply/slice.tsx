import { createSlice } from "@reduxjs/toolkit";

interface IMultiply {
  value: number;
}

const initialState: IMultiply = {
  value: 5,
};

const multiplySlice = createSlice({
  name: "manuplater",
  initialState,
  reducers: {
    multiply: (state) => {
      state.value *= 2;
    },
  },
});

export const { multiply } = multiplySlice.actions;
export default multiplySlice.reducer;
