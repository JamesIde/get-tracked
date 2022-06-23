import axios from "axios"

export const getProjects = async token => {
  const response = await axios.get("/api/projects")
  return response
}
