// src/features/task/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/axios";

// GET TASKS
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (projectId) => {
    const res = await API.get(`/tasks/${projectId}`);
    return res.data;
  }
);

// CREATE TASK
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ projectId, title, dueDate }) => {
    const res = await API.post(`/tasks/${projectId}`, {
      title,
      dueDate,
    });
    return res.data;
  }
);
// TOGGLE TASK
export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async (taskId) => {
    const res = await API.put(`/tasks/${taskId}`);
    return res.data;
  }
);

// DELETE TASK
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default taskSlice.reducer;