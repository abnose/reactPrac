import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../configs/axiosConfig";

// Task Interface
interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

// State Interface
interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial State
const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

// ✅ Fetch Tasks
export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/tasks");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tasks");
    }
  }
);

// ✅ Add Task
export const addTask = createAsyncThunk<Task, Omit<Task, "id">>(
  "tasks/addTask",
  async (newTask, { rejectWithValue }) => {
    try {
      const response = await api.post("/tasks", newTask);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add task");
    }
  }
);

// ✅ Edit Task
export const editTask = createAsyncThunk<Task, Task>(
  "tasks/editTask",
  async (updatedTask, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to edit task");
    }
  }
);

// ✅ Delete Task
export const deleteTask = createAsyncThunk<number, number>(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete task");
    }
  }
);

// ✅ Task Slice
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
        state.tasks = action.payload;
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
