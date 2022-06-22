// API calls to our backend
const axios = require("axios")

const API_URL = "/api/users"

const login = async userData => {
  try {
    // Call backend
    const response = await axios.post(API_URL + "/login", userData)
    // Return user
    localStorage.setItem("user", JSON.stringify(response.data))

    return response.data
  } catch (error) {
    // Return error
    return "Something went wrong"
  }
}

const register = async userData => {
  try {
    // Call backend
    const response = await axios.post(API_URL + "/register", userData)

    // Set item in storage
    localStorage.setItem("user", JSON.stringify(response.data))

    // Return user
    return response.data
  } catch (error) {
    // Return error
    return "Something went wrong"
  }
}

const authService = {
  login,
  register,
}
export default authService
