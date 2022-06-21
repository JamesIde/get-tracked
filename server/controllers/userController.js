const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// @DESC: Login Controller
// @ROUTE: /api/users/login
// @METHOD: POST
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const checkUser = await User.findOne({ email })

  if (!checkUser) {
    return res.status(400).json({
      message: "User does not exist",
    })
  }
  // Check if the password from the form matches the password in the database
  const isMatch = await bcrypt.compare(password, checkUser.password)

  if (isMatch) {
    return res.status(200).json({
      id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      token: generateToken(checkUser._id),
    })
  } else {
    return res.status(400).json({
      message: "Incorrect password or email",
    })
  }
})

// @DESC: Login Controller
// @ROUTE: /api/users/register
// @METHOD: POST
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, password2 } = req.body

  //    Check if all fields are filled out
  if (!name || !email || !password || !password2) {
    res.status(400).json({ message: "Please fill out all fields" })
  }
  //    Check if email already exists
  // Find user by checking email against email from body
  const userExists = await User.findOne({
    email,
  })

  // Throw error if user exists
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Check if passwords match
  if (password !== password2) {
    res.status(400).json({ message: "Passwords do not match" })
  }

  //    Hash the password
  const hashedPassword = bcrypt.hashSync(password, 12)

  //   Create the user and add to database
  const createUser = User.create({
    name,
    email,
    password: hashedPassword,
  })

  //   If successful, send back the user
  if (createUser) {
    res.status(201).json({
      message: "User Successfully Registered",
      _id: createUser._id,
      name,
      email,
      token: generateToken(createUser._id),
    })
  } else {
    res.status(404).json({ message: "An error occured creating the user" })
  }
})

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  })
}

module.exports = {
  loginUser,
  registerUser,
}
