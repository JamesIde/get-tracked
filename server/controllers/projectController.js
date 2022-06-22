const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const { protect } = require("../middleware/authMiddleware")
const Project = require("../models/projectModel")
const User = require("../models/userModel")

const createProject = asyncHandler(async (req, res) => {
  // Destructuring the req.body
  const { name, description, status } = req.body

  // Validate fields
  if (!name || !description) {
    return res.status(400).json({
      msg: "Please enter all fields",
    })
  }

  //   Check db for existing project
  const checkName = await Project.findOne({ name })

  if (checkName) {
    return res.status(400).json({
      msg: "Project name already exists",
    })
  }

  //   Create the project passing in the user from req.user
  const project = await Project.create({
    name,
    description,
    status,
    User: req.user,
  })

  res.status(201).json({
    msg: "Project created successfully",
    project,
  })
})

module.exports = {
  createProject,
}
