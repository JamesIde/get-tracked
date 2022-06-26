const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController")

router.route("/").get(protect, getTickets).post(protect, createTicket)
router
  .route("/:ticketId")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

const comments = require("./commentRoutes")

// Parent router to comments Routes
router.use(
  "/:ticketId/comments",
  function (req, res, next) {
    req.ticketId = req.params.ticketId
    next()
  },
  comments
)

module.exports = router
