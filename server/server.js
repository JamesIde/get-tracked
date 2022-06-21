const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const app = express()
const PORT = process.env.PORT

const dbConnect = require("./config/db")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()

app.get("/", (req, res) => {
  res.json({ message: "Welcome" })
})

app.use("/api/users", require("./routes/userRoutes"))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.underline)
})
