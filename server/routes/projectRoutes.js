const express = require("express")
const router = express.Router()

const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController")

const tickets = require("./ticketRoutes")

const { protect } = require("../middleware/authMiddleware")

router.post("/", protect, createProject)
router.get("/", protect, getProjects)

router
  .route("/:projectId")
  .get(protect, getProject)
  .delete(protect, deleteProject)
  .put(protect, updateProject)

router.use(
  "/:projectId/tickets",
  function (req, res, next) {
    // This creates a req.object that contains the project id
    // It passes it to the child router, which is tickets
    // Allows access to any projectID to get tickets from
    req.projectId = req.params.projectId
    next()
  },
  tickets
)

module.exports = router
