import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../configs/axiosConfig";
import { NavigateFunction } from "react-router-dom";

interface Task {
  id?: number | string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/tasks/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tasks");
    }
  }
);

export const addTask = createAsyncThunk<
  Task,
  {
    newTask: Omit<Task, "id">;
    navigate: NavigateFunction;
  },
  { rejectValue: string }
>(
  "tasks/addTask/",
  async ({ newTask, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/api/tasks/", newTask);
      navigate("/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add task");
    }
  }
);

export const editTask = createAsyncThunk<
  Task,
  { updatedTask: Task; navigate: NavigateFunction },
  { rejectValue: string }
>(
  "tasks/editTask",
  async ({ updatedTask, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(
        `/api/tasks/${updatedTask.id}`,
        updatedTask
      );
      navigate("/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to edit task");
    }
  }
);

export const deleteTask = createAsyncThunk<
  number,
  { taskId: number; closeModal: () => void },
  { rejectValue: string }
>(
  "tasks/deleteTask",
  async ({ taskId, closeModal }, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      dispatch(fetchTasks());
      closeModal();
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete task");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload.results;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
