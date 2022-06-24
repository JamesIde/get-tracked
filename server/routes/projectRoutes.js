const express = require("express")
const router = express.Router()

const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController")
const { getTickets, createTicket } = require("../controllers/ticketController")
const { protect } = require("../middleware/authMiddleware")

router.post("/create", protect, createProject)
router.get("/", protect, getProjects)

router
  .route("/:id")
  .get(protect, getProject)
  .delete(protect, deleteProject)
  .put(protect, updateProject)

router.get("/:id/tickets", protect, getTickets)
router.post("/:id/tickets", protect, createTicket)

// router.get("/:id", protect, getProject)
// router.delete("/:id", protect, deleteProject)
// router.put("/:id", protect, updateProject)

module.exports = router
