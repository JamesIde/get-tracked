import commentService from "./commentService"
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")

const initialState = {
  comments: [],
  comment: [],
  commentLoading: false,
  commentError: false,
  commentSuccess: false,
}

export const getComments = createAsyncThunk(
  "commments/getComments",
  async (ticketId, thunkAPI) => {
    const token = thunkAPI.getState().authReducer.user.token
    const projectId = thunkAPI.getState().projectReducer.project._id
    try {
      const response = await commentService.getAllComments(
        ticketId,
        projectId,
        token
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(getComments.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export default commentSlice.reducer
