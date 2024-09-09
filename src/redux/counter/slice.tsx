import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value *= 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;
export const counterSlicer = counterSlice.reducer;

// Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented());
// {value: 1}
// store.dispatch(incremented());
// {value: 2}
// store.dispatch(decremented());
// {value: 1}
