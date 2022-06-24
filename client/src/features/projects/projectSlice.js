import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authSlice from "../auth/authSlice"
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
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
  },
})

export default projectSlice.reducer
