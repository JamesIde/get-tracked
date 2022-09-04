import { API } from "../../helper/API"

const getAllComments = async (ticketId, projectId, token) => {
  // call backend

  const response = await API.get(
    `/api/projects/${projectId}/tickets/${ticketId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

const createComment = async (ticketId, projectId, comment, token) => {
  // call backend
  const response = await API.post(
    `/api/projects/${projectId}/tickets/${ticketId}/comments/create`,
    {
      content: comment,
    },
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
  createComment,
}

export default commentService
