import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import CreateProject from "./Pages/CreateProject"
import Projects from "./Pages/Projects"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
