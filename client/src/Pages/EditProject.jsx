import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSngProject, updateProject } from "../features/projects/projectSlice"
import { Link } from "react-router-dom"
import Spinner from "../Components/Spinner"
import projectService from "../features/projects/projectService"
function EditProject() {
  const projectId = useParams().projectId
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { project, isLoading, isError, message } = useSelector(
    state => state.projectReducer
  )

  useEffect(() => {
    dispatch(getSngProject(projectId))
  }, [dispatch])

  const [projectName, setProjectName] = useState(() => {
    const editProj = localStorage.getItem("editProject")
    const editProjVal = JSON.parse(editProj)
    return editProjVal.name
  })

  const [projectDescription, setProjectDescription] = useState(() => {
    const editProj = localStorage.getItem("editProject")
    const editProjVal = JSON.parse(editProj)
    return editProjVal.description
  })
  const [projectStatus, setProjectStatus] = useState(() => {
    const editProj = localStorage.getItem("editProject")
    const editProjVal = JSON.parse(editProj)
    return editProjVal.status
  })

  if (isLoading) {
    return <Spinner />
  }

  const handleUpdate = e => {
    e.preventDefault()

    if (
      projectName === "" ||
      projectDescription === "" ||
      projectStatus === ""
    ) {
      alert("Please fill out all fields")
    }

    const editProject = {
      name: projectName,
      description: projectDescription,
      status: projectStatus,
    }

    dispatch(updateProject(editProject))
    // await projectService.updateProject(projectId, editProject, user.token)
    navigate(`/projects/${projectId}`)
  }

  return (
    <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto">
      <h1 className="font-bold text-3xl text-center mt-5 mb-2">
        Edit: {project.name}
      </h1>
      <hr />
      <div className="w-8/12 mx-auto mt-12">
        <div className="form-group">
          <form onSubmit={handleUpdate}>
            <div className="form-group-item">
              <label htmlFor="projectName" className="text-xl">
                Project Name
              </label>
              <input
                type="projectName"
                placeholder="Enter the project name"
                className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                min="3"
                value={projectName}
                onChange={e => {
                  setProjectName(e.target.value)
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
                value={projectDescription}
                onChange={e => {
                  setProjectDescription(e.target.value)
                }}
              />
            </div>
            <div className="form-group-item mt-4">
              <label htmlFor="projectStatus" className="text-xl">
                Project Status
              </label>
              <select
                name="projectStatus"
                id="projectStatus"
                className="w-full border-[1px] p-1 mb-2 mt-1 rounded"
                value={projectStatus}
                onChange={e => {
                  setProjectStatus(e.target.value)
                }}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button className="w-full bg-black text-white rounded p-2 mt-4">
              <p className="text-xl">Update Project</p>
            </button>
            <Link to={`/projects/${project._id}`}>
              <button className="w-full bg-white text-black p-2 mt-4 border-2 rounded">
                <p className="text-xl">Cancel</p>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditProject
