import axios from "axios"

const API_URL = "/api/projects"

const getProjects = async token => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const getSingleProject = async (projectId, token) => {
  const response = await axios.get(`${API_URL}/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const createProject = async (projectData, token) => {
  const response = await axios.post(API_URL, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const deleteProject = async (projectId, token) => {
  const response = await axios.delete(`${API_URL}/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const updateProject = async (projectId, projectData, token) => {
  const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const projectService = {
  getProjects,
  createProject,
  getSingleProject,
  deleteProject,
  updateProject,
}

export default projectService
