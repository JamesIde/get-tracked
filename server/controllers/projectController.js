const express = require("express")
const asyncHandler = require("express-async-handler")
const Project = require("../models/projectModel")
const Ticket = require("../models/ticketModel")

// REQ.USER is the USER OBJECT from the AUTH MIDDLEWARE
// This comes from the auth middleware
// Req.user comes from the user found from the db that matches the decoded token

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

// @DESC   Update a project
// @ROUTE  PUT /api/projects/:projectId
// @ACCESS Private
const updateProject = asyncHandler(async (req, res) => {
  // Get the project ID from req
  const projectId = req.params.projectId
  // Destructuring the req.body
  const { name, description, status } = req.body

  // Validate fields
  if (!name || !description) {
    return res.status(400).json({
      msg: "Please enter all fields",
    })
  }

  // Fetch the project by the ID
  const oldProject = await Project.findById(projectId)

  // If not found, return error
  if (!oldProject) {
    return res.status(404).json({
      msg: "Project not found",
    })
  }

  // We need to verify if the project to update, has an ID that matches the ID of the user requesting to update it
  if (oldProject.User.toString() !== req.user.id) {
    return res.status(401).json({
      msg: "Not authorized",
    })
  }

  // Update the project
  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
      status,
    },
    { new: true }
  )

  res.status(200).json({
    msg: "Project updated successfully",
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
  if (!projects || projects.length === 0) {
    return res.status(400).json({
      msg: "No projects found",
    })
  }
  res.status(200).json(
    projects
    // User: req.user.name,
  )
})

// @DESC   Get a single project
// @ROUTE  GET /api/projects/:projectId
// @ACCESS Private
const getProject = asyncHandler(async (req, res) => {
  // Find the project by the id
  const projectId = req.params.projectId
  const project = await Project.findById(projectId)

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

// @DESC   Delete a single project and associated tickets
// @ROUTE  DELETE/api/projects/:projectId
// @ACCESS Private
const deleteProject = asyncHandler(async (req, res) => {
  // Find the project by the id
  const project = await Project.findById(req.params.projectId)

  if (!project || project === null) {
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
  // Remove tickets associated with the project if any
  // const tickets = await Ticket.find({ project: req.params.projectId })
  // if (tickets) {
  //   await Ticket.deleteMany({ project: req.params.projectId })
  // }

  try {
    await project.remove()
    res.status(200).json({
      msg: "Project deleted successfully",
      projectId: req.params.projectId,
    })
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting project",
    })
  }
})

module.exports = {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
}
