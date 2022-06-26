import { FaProjectDiagram } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createProject, reset } from "../features/projects/projectSlice"
import Spinner from "../Components/Spinner"

function CreateProject() {
  const { projects, isLoading, isError, message, isSuccess } = useSelector(
    state => state.projectReducer
  )

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    // if (!name || !description) {
    //   toast.error("Please fill in all fields")
    // }
    // if (name.trim().length < 5) {
    //   toast.error("Project name must be at least 5 characters")
    // }
    // if (description.trim().length < 10) {
    //   toast.error("Project description must be at least 10 characters")
    // }
    // Construct the project object
    const projectData = {
      name,
      description,
    }
    // send to slice
    dispatch(createProject(projectData))
    navigate("/projects")
  }

  return (
    <div>
      <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto ">
        <div className="text-center mt-10 mb-5 flex items-center justify-center">
          <FaProjectDiagram size={30} className="mr-2" />
          <h1 className="text-4xl font-bold">Create Project</h1>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400">
            Tell us about the project
          </p>
        </div>
        <div className="w-8/12 mx-auto mt-12">
          <div className="form-group">
            <form onSubmit={handleSubmit}>
              <div className="form-group-item">
                <label htmlFor="projectName" className="text-xl">
                  Project Name
                </label>
                <input
                  type="projectName"
                  placeholder="Enter the project name"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  min="3"
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4">
                <label htmlFor="projectDescription" className="text-xl">
                  Project Description
                </label>
                <textarea
                  name="projectDescription"
                  id="projectDescription"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  placeholder="Tell us about the project"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value)
                  }}
                />
              </div>

              <button className="w-full bg-black text-white rounded p-2 mt-4">
                <p className="text-xl">Create Project</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateProject
