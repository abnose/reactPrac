import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./manageTasks/slice";
const rootReducer = combineReducers({
  task: taskReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
