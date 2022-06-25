const mongoose = require("mongoose")
const User = require("../models/userModel")

const Project = mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Please add a project name"],
    },
    description: {
      type: String,
      required: [true, "Please add a project description"],
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "Aborted"],
      default: "In Progress",
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("Project", Project)
