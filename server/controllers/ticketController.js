const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Project = require("../models/projectModel")
const Ticket = require("../models/ticketModel")

// @DESC   Get all tickets associated with a project
// @ROUTE  GET /api/projects/:id/tickets
// @ACCESS Private
const getTickets = asyncHandler(async (req, res) => {
  // Get the project
  const projectId = req.params.id

  //   Find the project based on the id
  const project = await Project.findById(projectId)

  //   If the requesting user ID does not match the project User ID,
  if (req.user.id !== project.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  } else {
    // We find the tickets associated with the project
    const tickets = await Ticket.find({ Project: projectId })
    if (!tickets) {
      return res.status(404).json({ message: "No tickets found" })
    } else {
      res.status(200).json(tickets)
    }
  }
})
// @DESC   Create a ticket associated with a project
// @ROUTE  POST /api/projects/:id/tickets
// @ACCESS Private
const createTicket = asyncHandler(async (req, res) => {
  // Destructure the body for validation
  const { title, description, status } = req.body

  // Get the project ID
  const projectId = req.params.id

  //   Find the project based on the id
  const project = await Project.findById(projectId)

  //   If the requesting user ID does not match the project User ID, return error
  if (req.user.id !== project.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  } else {
    // Validate input and create ticket
    if (!title || !description) {
      return res.status(400).json({
        msg: "Please enter all fields",
      })
    }
    // Create the ticket
    const newTicket = await Ticket.create({
      User: req.user.id,
      Project: projectId,
      title,
      description,
      status,
    })
    if (newTicket) {
      res.status(201).json({
        message: "Ticket created successfully",
        ticket: newTicket,
      })
    }
  }
})

module.exports = { getTickets, createTicket }
