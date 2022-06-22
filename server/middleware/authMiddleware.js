const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const protect = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from the request header
    const token =
      req.header("x-auth-token") || req.header("authorization").split(" ")[1]

    // Check if token is not present
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      })
    }

    // Verify token
    // This decodes the token into an id: string
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get the user by the decoded token
    // We set req.user to the user found by the token
    req.user = await User.findById(decoded.id).select("-password")

    next()
  } catch (error) {
    res.status(404).json({ message: "Invalid request" })
  }
})

module.exports = { protect }

// The token is extracted from the Authorization header and split into two parts.
// The token is then verified using the JWT_SECRET.
// The decoded token is then used to search the database for the user ID that matches the ID from the decoded token.
// The user is then set to the request object.
// The next function is then called.
