import axios from "axios"

const getProjects = async token => {
  const response = await axios.get("/api/projects", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const projectService = {
  getProjects,
}

export default projectService
