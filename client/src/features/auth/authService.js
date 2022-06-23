// API calls to our backend
const axios = require("axios")

const API_URL = "/api/users"

const login = async userData => {
  const response = await axios.post(API_URL + "/login", userData)
  return response
}

const register = async userData => {
  // Call backend
  const response = await axios.post(API_URL + "/register", userData)

  return response
}

const authService = {
  login,
  register,
}
export default authService
