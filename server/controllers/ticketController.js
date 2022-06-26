const asyncHandler = require("express-async-handler")
const Project = require("../models/projectModel")
const Ticket = require("../models/ticketModel")

// @DESC   Get all tickets associated with a project
// @ROUTE  GET /api/projects/:projectId/tickets
// @ACCESS Private
const getTickets = asyncHandler(async (req, res) => {
  // Get the project
  const projectId = req.projectId

  //   Find the project based on the id
  const project = await Project.findById(projectId)

  //   If the requesting user ID does not match the project User ID,
  if (req.user.id !== project.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  }

  // We find the tickets associated with the project based in its ID
  const tickets = await Ticket.find({ Project: projectId })

  //   If there are no tickets, we return an error
  if (!tickets || tickets.length === 0) {
    return res.status(404).json({ message: "No tickets found" })
  }

  res.status(200).json(tickets)
})

// @DESC   Get an individual ticket
// @ROUTE  GET /api/projects/:projectId/tickets/:ticketId
// @ACCESS Private
const getTicket = asyncHandler(async (req, res) => {
  const projectId = req.projectId
  const ticketId = req.params.ticketId

  //   Find the project based on the id
  const project = await Project.findById(projectId)

  if (!project) {
    return res.status(404).json({ message: "Project not found" })
  }

  //   If the requesting user ID does not match the project User ID, return error
  if (req.user.id !== project.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  }

  //   Find the ticket for that project based on the id
  const ticket = await Ticket.findById(ticketId)

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" })
  }
  res.status(200).json(ticket)
})

// @DESC   Create a ticket associated with a project
// @ROUTE  POST /api/projects/:projectId/tickets
// @ACCESS Private
const createTicket = asyncHandler(async (req, res) => {
  // Destructure the body for validation
  const { title, description, status, priority } = req.body

  // Get the project ID
  const projectId = req.projectId

  //   Find the project based on the id
  const project = await Project.findById(projectId)

  //   If the requesting user ID does not match the project User ID, return error
  if (req.user.id !== project.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  }

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
    priority,
  })
  //   If ticket is created, return the ticket
  if (newTicket) {
    res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    })
  }
})

// @DESC   Update a ticket
// @ROUTE  PUT /api/projects/:projectId/tickets/:ticketId
// @ACCESS Private
const updateTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.ticketId

  const oldTicket = await Ticket.findById(ticketId)

  if (!oldTicket) {
    return res.status(404).json({
      msg: "Ticket not found",
    })
  }

  if (oldTicket.User.toString() !== req.user.id) {
    return res.status(401).json({
      msg: "Invalid request",
    })
  }

  // Update the ticket
  const { title, description, status, priority } = req.body

  const updatedTicket = await Ticket.findByIdAndUpdate(
    ticketId,
    {
      title,
      description,
      status,
      priority,
    },
    { new: true }
  )

  if (updateTicket) {
    res.status(200).json({
      msg: "Ticket updated successfully",
      ticket: updatedTicket,
    })
  }
})

// @DESC   Delete a ticket
// @ROUTE  PUT /api/projects/:projectId/tickets/:ticketId
// @ACCESS Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get the id from params
  const ticketId = req.params.ticketId
  const projectId = req.projectId
  //   Get the project from the projectId
  const project = await Project.findById(projectId)

  const ticket = await Ticket.findById(ticketId)

  if (!ticket && !project) {
    return res.status(404).json({
      msg: "Something went wrong",
    })
  }

  await Ticket.findByIdAndDelete(ticketId)
  res.status(200).json({
    msg: "Ticket deleted successfully",
    ticketId: ticketId,
  })
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
}
