const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const app = express()
const PORT = process.env.PORT

const dbConnect = require("./config/db")

//Allow us to send json to and from
// Allow us to send stuff in request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to database
dbConnect()

//Basic welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" })
})
// /api/users/routesInUserRoutes same with projectRoutes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.underline)
})
