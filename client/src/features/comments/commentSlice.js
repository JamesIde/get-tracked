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

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (comment, thunkAPI) => {
    const token = thunkAPI.getState().authReducer.user.token
    const projectId = thunkAPI.getState().projectReducer.project._id
    const ticketId = thunkAPI.getState().ticketReducer.ticket._id
    try {
      const response = await commentService.createComment(
        ticketId,
        projectId,
        comment,
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
  reducers: {
    clearComments: state => {
      state.comments = []
      state.isLoading = false
    },
  },
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
    builder.addCase(createComment.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload]
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export const { clearComments } = commentSlice.actions
export default commentSlice.reducer
