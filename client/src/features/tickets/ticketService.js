// Backend call
import axios from "axios"

const API_URL = "/api/projects"

const getTickets = async (projectId, token) => {
  const response = await axios.get(`${API_URL}/${projectId}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const addTicket = async (ticketData, projectId, token) => {
  const response = await axios.post(
    `${API_URL}/${projectId}/tickets`,
    ticketData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response
}

const deleteTicket = async (ticketId, projectId, token) => {
  const response = await axios.delete(
    `${API_URL}/${projectId}/tickets/${ticketId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response
}
const ticketService = {
  getTickets,
  addTicket,
  deleteTicket,
}

export default ticketService
