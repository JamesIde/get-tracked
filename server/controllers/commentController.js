const express = require("express")
const asyncHandler = require("express-async-handler")
const Comment = require("../models/commentModel")
const Ticket = require("../models/ticketModel")
const User = require("../models/userModel")

// @DESC   Get all comments associated with a ticket
// @ROUTE  GET /api/projects/:projectId/tickets/:ticketId/comments
// @ACCESS Private
const getComments = asyncHandler(async (req, res) => {
  // Thoughts on checks
  const ticketUser = await User.findById(req.user.id)
  const ticketId = req.ticketId

  const ticket = await Ticket.findById(ticketId)

  // If the User is not the owner of the ticket, return error
  if (ticketUser.id !== ticket.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  }

  // Find the comments associated with the ticket based in its ID
  const comments = await Comment.find({ Ticket: ticketId })

  // If there are no comments, we return an error
  if (!comments || comments.length === 0) {
    return res.status(404).json({ message: "No comments found" })
  }
})

// @DESC   Create a comment associated with a ticket
// @ROUTE  POST /api/projects/:projectId/tickets/:ticketId/comments/create
// @ACCESS Private
const addComment = asyncHandler(async (req, res) => {
  // Find user and ticket ID from params
  const ticketUser = await User.findById(req.user).select("-password")
  const ticketId = req.ticketId

  // // Find the ticket
  const ticket = await Ticket.findById(ticketId)

  // If the User is not the owner of the ticket, return error
  if (ticketUser.id !== ticket.User.toString()) {
    return res.status(401).json({ message: "Invalid request" })
  }

  // // Validate a comment has a body
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ message: "Please add a comment" })
  }

  const createTicket = await Comment.create({
    content,
    userEmail: ticketUser.email,
    User: ticketUser.id,
    Ticket: ticketId,
  })

  if (createTicket) {
    return res.status(201).json(createTicket)
  }
})

module.exports = {
  getComments,
  addComment,
}
