import { configureStore } from "@reduxjs/toolkit";
import { counterSlicer } from "./counter/slice";
import { multiplySlicer } from "./multiply/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counterSlicer,
  multiplySlicer,
});

// const store = configureStore({
//   reducer: [counterSlice.reducer, multiplySlice],
// });

export const store = configureStore({
  reducer: rootReducer,
});

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));
