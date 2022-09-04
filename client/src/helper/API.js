import axios from "axios"

export const API = axios.create({
  baseURL: "https://get-tracked-production.up.railway.app",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
