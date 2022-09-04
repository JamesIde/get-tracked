// API calls to our backend
import { API } from "../../helper/API"

const login = async userData => {
  const response = await API.post("/api/users/login", userData)
  return response
}

const register = async userData => {
  // Call backend
  const response = await API.post("/api/users/register", userData)

  return response
}

const authService = {
  login,
  register,
}
export default authService
