// src/features/project/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../app/axios";

// GET PROJECTS
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    const res = await API.get("/projects");
    return res.data;
  }
);

// CREATE PROJECT
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data) => {
    const res = await API.post("/projects", data);
    return res.data;
  }
);

// DELETE PROJECT
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    await API.delete(`/projects/${id}`);
    return id;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;