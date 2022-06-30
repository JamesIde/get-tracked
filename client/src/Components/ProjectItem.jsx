import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteProject, reset } from "../features/projects/projectSlice"
import Spinner from "./Spinner"
function ProjectItem({ project }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.authReducer)
  const { isLoading } = useSelector(state => state.projectReducer)
  const handleClick = projectId => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? All corresponding tickets will be deleted too"
      )
    ) {
      dispatch(deleteProject(projectId))
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  // dispatch(deleteProject(projectId))
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 border-2 mb-2 rounded p-2">
      <div>
        <h1 className="font-bold">{project.name}</h1>
      </div>
      <div>
        <p>{project.description}</p>
      </div>
      <div className="xl:text-center lg:text-center md:text-center text-left">
        <p>
          <p className="font-bold">
            {new Date(project.createdAt).toLocaleDateString("en-AU")}
          </p>{" "}
        </p>
      </div>
      <div className="flex flex-row justify-center">
        <Link to={`/projects/${project._id}`}>
          <button class="bg-blue-500 hover:bg-blue-700 duration-500 text-white font-bold p-2 rounded m-1">
            View Project
          </button>
        </Link>
        <button
          class="bg-red-500 hover:bg-red-900 duration-500 text-white font-bold p-2 rounded m-1"
          //  onClick dispatch to delete the project
          onClick={() => {
            handleClick(project._id)
          }}
        >
          Delete Project
        </button>
      </div>
    </div>
  )
}
export default ProjectItem
