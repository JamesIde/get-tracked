const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

const express = require("express")
const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)

router.get("/me", protect, getMe)

module.exports = router
