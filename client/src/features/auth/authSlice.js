import authService from "./authService"
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"))

// Initial global state
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData)

      localStorage.setItem("user", JSON.stringify(response.data))

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

// For register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData)
      localStorage.setItem("user", JSON.stringify(response.data))
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const logoutUser = createAsyncThunk("auth/logout", async thunkAPI => {
  localStorage.removeItem("user")
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Login successful"
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Register successful"
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Logout successful"
    })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
