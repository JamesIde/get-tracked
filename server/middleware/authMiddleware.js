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
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select("-password")
    next()
  } catch (error) {
    res.status(404).json({ message: "Invalid request" })
  }
})

module.exports = { protect }

// Extracting the token from incoming requests from the Authorization header.
// The token is extracted from the Authorization header and split into two parts.
// The token is then verified using the JWT_SECRET.
// The decoded token is then stored in the request object as req.user.
// The next middleware is then called.
