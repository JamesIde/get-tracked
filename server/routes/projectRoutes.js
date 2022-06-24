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

router.post("/create", protect, createProject)
router.get("/", protect, getProjects)

router
  .route("/:projectId")
  .get(protect, getProject)
  .delete(protect, deleteProject)
  .put(protect, updateProject)

router.use(
  "/:projectId/tickets",
  function (req, res, next) {
    req.projectId = req.params.projectId
    next()
  },
  tickets
)

module.exports = router
