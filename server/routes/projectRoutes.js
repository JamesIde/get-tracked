const express = require("express")
const router = express.Router()

const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
} = require("../controllers/projectController")
const { protect } = require("../middleware/authMiddleware")

router.post("/create", protect, createProject)
router.get("/", protect, getProjects)
router.get("/:id", protect, getProject)
router.delete("/:id", protect, deleteProject)
module.exports = router
