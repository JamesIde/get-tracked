import ticketService from "./ticketService"

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")

const initialState = {
  tickets: [],
  ticket: [],
  Loading: false,
  Error: false,
  Success: false,
  Message: "",
}

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: builders => {
    builders.addCase(getTickets.pending, state => {
      state.Loading = true
    })
    builders.addCase(getTickets.fulfilled, (state, action) => {
      state.tickets = action.payload
      state.Loading = false
      state.Error = false
      state.Success = true
    })
    builders.addCase(getTickets.rejected, (state, action) => {
      state.Loading = false
      state.Error = true
      state.Success = false
      state.Message = action.payload
    })
  },
})

export const getTickets = createAsyncThunk(
  "ticket/getTickets",
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const response = await ticketService.getTickets(projectId, token)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export default ticketSlice.reducer
