import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import projectReducer from "../features/projects/projectSlice"
import ticketReducer from "../features/tickets/ticketSlice"
import commentReducer from "../features/comments/commentSlice"
export const store = configureStore({
  reducer: { authReducer, projectReducer, ticketReducer, commentReducer },
})
