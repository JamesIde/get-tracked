const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const { protect } = require("../middleware/authMiddleware")
const Project = require("../models/projectModel")
const User = require("../models/userModel")

// @ROUTE   /api/projects/create
// @DESC    POST Create a project
// @ACCESS  Private
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

// @DESC   Get all projects
// @ROUTE  /api/projects/
// @ACCESS Private
const getProjects = asyncHandler(async (req, res) => {
  // Find the projects in the db
  // Only getting the projects where the User matches the req.user
  const projects = await Project.find({ User: req.user })

  if (!projects) {
    return res.status(400).json({
      msg: "No projects found",
    })
  }

  res.status(200).json({
    projects,
    User: req.user.name,
  })
})

// @DESC   Get a single project
// @ROUTE  GET /api/projects/:id
// @ACCESS Private
const getProject = asyncHandler(async (req, res) => {
  // Find the project by the id
  const project = await Project.findById(req.params.id)

  if (!project) {
    return res.status(400).json({
      msg: "Project not found",
    })
  }

  // We need to check if the project returned from the database
  // Has the same user ID,
  // As the user ID in the req.user, who is requesting it

  if (project.User.toString() !== req.user.id) {
    return res.status(401).json({
      msg: "Not authorized",
    })
  }

  res.status(200).json(project)
})

// @DESC   Delete a single project
// @ROUTE  DELETE/api/projects/:id
// @ACCESS Private
const deleteProject = asyncHandler(async (req, res) => {
  // Find the project by the id
  const project = await Project.findById(req.params.id)

  if (!project) {
    return res.status(400).json({
      msg: "Project not found",
    })
  }

  // We need to check if the project returned from the database
  // Has the same user ID,
  // As the user ID in the req.user, who is requesting it

  if (project.User.toString() !== req.user.id) {
    return res.status(401).json({
      msg: "Not authorized",
    })
  } else {
    await project.remove()
    res.status(200).json({
      msg: "Project deleted successfully",
    })
  }
})

module.exports = {
  createProject,
  getProjects,
  getProject,
  deleteProject,
}
