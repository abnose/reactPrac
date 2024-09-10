import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterSlice {
  value: number;
}

const initialState: counterSlice = {
  value: 0,
};

export const incrementedWithDelay = createAsyncThunk(
  "counter/incAsync",
  async (amount: number) => {
    await new Promise((resolve) => {
      setTimeout(() => resolve, 1000);
    });
    return amount;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementedWithDelay.pending, () => {
        console.log("pending shit");
      })
      .addCase(
        incrementedWithDelay.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      );
  },
});

export const { incremented, decremented } = counterSlice.actions;
export default counterSlice.reducer;
