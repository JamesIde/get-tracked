import { API } from "../../helper/API"

const getProjects = async token => {
  const response = await API.get("/api/projects", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const getSingleProject = async (projectId, token) => {
  const response = await API.get(`/api/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const createProject = async (projectData, token) => {
  const response = await API.post("/api/projects", projectData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const deleteProject = async (projectId, token) => {
  const response = await API.delete(`/api/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const updateProject = async (projectId, projectData, token) => {
  const response = await API.put(`/api/projects/${projectId}`, projectData, {
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
