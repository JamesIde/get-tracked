import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import CreateProject from "./Pages/CreateProject"
import Projects from "./Pages/Projects"
import Project from "./Pages/Project"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CreateTicket from "./Pages/CreateTicket"
import Footer from "./Components/Footer"

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
          <Route path="/projects/:projectId" element={<Project />} />
          <Route path="/:projectId/createticket" element={<CreateTicket />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
      <ToastContainer />
    </>
  )
}

export default App
