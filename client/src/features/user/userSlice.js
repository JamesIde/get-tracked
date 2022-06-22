import authService from "../user/userService"
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
// Get user from local storage
const user = localStorage.getItem("user")

// Initial global state
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const loginUser = createAsyncThunk("user/login", async userData => {
  try {
    // Call backend
    return await authService.login(userData)
  } catch (error) {
    return error.response.data
  }
})

// For register

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
  },
})

export default userSlice.reducer
