const axios = require("axios")

const API_URL = "/api/projects"

const getAllComments = async (ticketId, projectId, token) => {
  // call backend

  const response = await axios.get(
    `${API_URL}/${projectId}/tickets/${ticketId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

const commentService = {
  getAllComments,
}

export default commentService
