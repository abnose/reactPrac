import { createSlice } from "@reduxjs/toolkit";

const multiplySlice = createSlice({
  name: "manuplater",
  initialState: {
    value: 0,
  },
  reducers: {
    multiply: (state) => {
      state.value *= 2;
    },
  },
});
export const multiplySlicer = multiplySlice.reducer;
export const { multiply } = multiplySlice.actions;

// Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented());
// {value: 1}
// store.dispatch(incremented());
// {value: 2}
// store.dispatch(decremented());
// {value: 1}
