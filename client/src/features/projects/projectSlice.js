import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import projectService from "./projectService"

const initialState = {
  projects: [],
  project: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (token, thunkAPI) => {
    try {
      const response = await projectService.getProjects(token)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const getSngProject = createAsyncThunk(
  "projects/getSingleProject",
  async (projectId, thunkAPI) => {
    const token = await thunkAPI.getState().authReducer.user.token

    try {
      const response = await projectService.getSingleProject(projectId, token)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const response = await projectService.createProject(projectData, token)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: state => {
      state.projects = []
      state.project = []
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: builder => {
    builder.addCase(getProjects.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(getSngProject.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSngProject.fulfilled, (state, action) => {
      state.project = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(getSngProject.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(createProject.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer
