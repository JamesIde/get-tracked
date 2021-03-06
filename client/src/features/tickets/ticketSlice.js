import ticketService from "./ticketService"
import CalcTicketPriority from "../../Components/Charts/CalcTicketPriority"

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")

const ticket = localStorage.getItem("ticket")
const initialState = {
  tickets: [],
  ticket: ticket ? JSON.parse(ticket) : null,
  Loading: false,
  Error: false,
  Success: false,
  Message: "",
  ticketLoader: false,
  ticketPriorityCount: null,
}

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    clearTicket: state => {
      state.ticket = []
      // state.tickets = []
      state.Loading = false
      state.Error = false
      state.Success = false
      state.Message = ""
    },
    clearTickets: state => {
      state.tickets = []
      state.Loading = false
      state.Error = false
      state.Success = false
      state.Message = ""
    },
    addTicketPriority: state => {
      state.ticketPriorityCount = CalcTicketPriority(state.tickets)
    },
  },
  extraReducers: builders => {
    builders.addCase(getTickets.pending, state => {
      state.Loading = true
      state.ticketLoader = true
    })
    builders.addCase(getTickets.fulfilled, (state, action) => {
      state.tickets = action.payload
      state.Loading = false
      state.Error = false
      state.Success = true
      state.ticketLoader = false
      state.ticketPriorityCount = CalcTicketPriority(state.tickets)
    })
    builders.addCase(getTickets.rejected, (state, action) => {
      state.Loading = false
      // state.Error = true
      state.Success = false
      state.ticketLoader = false

      // state.Message = action.payload
    })
    builders.addCase(getSingleTicket.pending, state => {
      state.Loading = true
    })
    builders.addCase(getSingleTicket.fulfilled, (state, action) => {
      state.ticket = action.payload
      state.Loading = false
      state.Error = false
      state.Success = true
    })
    builders.addCase(getSingleTicket.rejected, (state, action) => {
      state.Loading = false
      state.Error = true
      state.Success = false
      state.Message = action.payload
    })
    builders.addCase(createTicket.pending, state => {
      state.Loading = true
      state.Success = false
    })
    builders.addCase(createTicket.fulfilled, (state, action) => {
      state.Message = action.payload.message
      state.ticket = action.payload.ticket
      state.Loading = false
      state.Error = false
      state.Success = true
      state.tickets = [...state.tickets, action.payload.ticket]
    })
    builders.addCase(createTicket.rejected, (state, action) => {
      state.Loading = false
      state.Error = true
      state.Success = false
      state.Message = action.payload.ticket
    })
    builders.addCase(deleteTicket.pending, state => {
      state.Loading = true
    })
    builders.addCase(deleteTicket.fulfilled, (state, action) => {
      state.Message = action.payload
      state.Loading = false
      state.Error = false
      state.Success = true
      // Create a new array without the deleted ticket
      state.tickets = state.tickets.filter(
        ticket => ticket._id !== action.payload.ticketId
      )
    })
    builders.addCase(deleteTicket.rejected, (state, action) => {
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

export const getSingleTicket = createAsyncThunk(
  "ticket/getSingleTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const projectId = thunkAPI.getState().projectReducer.project._id
      const response = await ticketService.getTicket(ticketId, projectId, token)
      localStorage.setItem("ticket", JSON.stringify(response.data))
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const projectId = thunkAPI.getState().projectReducer.project._id
      const response = await ticketService.addTicket(
        ticketData,
        projectId,
        token
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authReducer.user.token
      const projectId = thunkAPI.getState().projectReducer.project._id

      const response = await ticketService.deleteTicket(
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

export const { clearTicket, clearTickets, addTicketPriority } =
  ticketSlice.actions
export default ticketSlice.reducer
