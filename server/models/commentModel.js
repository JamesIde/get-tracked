const mongoose = require("mongoose")
const User = require("./userModel")
const Ticket = require("./ticketModel")
const Project = require("./projectModel")

const Comment = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
})

module.exports = mongoose.model("Comment", Comment)
