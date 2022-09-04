import { API } from "../../helper/API"

const getTickets = async (projectId, token) => {
  const response = await API.get(`/api/projects/${projectId}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const getTicket = async (ticketId, projectId, token) => {
  const response = await API.get(
    `/api/projects/${projectId}/tickets/${ticketId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response
}

const addTicket = async (ticketData, projectId, token) => {
  const response = await API.post(
    `/api/projects/${projectId}/tickets`,
    ticketData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response
}

const deleteTicket = async (ticketId, projectId, token) => {
  const response = await API.delete(
    `/api/projects/${projectId}/tickets/${ticketId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response
}
const ticketService = {
  getTickets,
  getTicket,
  addTicket,
  deleteTicket,
}

export default ticketService
