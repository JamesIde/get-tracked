import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import projectService from "./projectService"

const project = localStorage.getItem("editProject")
const initialState = {
  projects: [],
  project: project ? JSON.parse(project) : null,
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
      localStorage.setItem("editProject", JSON.stringify(response.data))
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

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const projectId = thunkAPI.getState().projectReducer.project._id

      const response = await projectService.updateProject(
        projectId,
        projectData,
        token
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const response = await projectService.deleteProject(projectId, token)
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
      state.project = action.payload.project
      state.message = action.payload.msg
      state.projects = [...state.projects, action.payload.project]
    })
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload.msg
    })
    builder.addCase(deleteProject.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.payload
      state.projects = state.projects.filter(
        project => project._id !== action.payload.projectId
      )
    })
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(updateProject.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = action.payload.msg
      state.project = action.payload.project
    })
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer
