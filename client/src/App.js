import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import CreateProject from "./Pages/CreateProject"
import Projects from "./Pages/Projects"
import Project from "./Pages/Project"
import PrivateRoute from "./Components/PrivateRoute"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CreateTicket from "./Pages/CreateTicket"
import EditProject from "./Pages/EditProject"
import Ticket from "./Pages/Ticket"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/:projectId/createticket" element={<CreateTicket />} />
          <Route path="/:projectId/edit" element={<EditProject />} />
          <Route path="/projects" element={<PrivateRoute />}>
            <Route path="/projects" element={<Projects />} />
          </Route>
          <Route path="/createProject" element={<PrivateRoute />}>
            <Route path="/createProject" element={<CreateProject />} />
          </Route>
          <Route path="/projects/:projectId" element={<PrivateRoute />}>
            <Route path="/projects/:projectId" element={<Project />} />
          </Route>
          <Route
            path="/projects/:projectId/ticket/:ticketId"
            element={<Ticket />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
