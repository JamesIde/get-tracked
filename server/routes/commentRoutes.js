const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")

const { getComments, addComment } = require("../controllers/commentController")

router.get("/", protect, getComments)
router.post("/create", protect, addComment)

module.exports = router
