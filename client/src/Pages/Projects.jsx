import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProjects } from "../features/projects/projectSlice"
import { Link } from "react-router-dom"
import { FaPencilAlt } from "react-icons/fa"
import ProjectItem from "../Components/ProjectItem"
function Projects() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.authReducer)
  const { projects, isLoading, isError, message, isSuccess } = useSelector(
    state => state.projectReducer
  )

  useEffect(() => {
    if (user) {
      dispatch(getProjects(user.token))
    }
  }, [user, dispatch])

  return (
    <div className="mx-auto h-24 w-8/12 mt-5">
      {projects.length > 0 ? (
        <>
          <h1 className="font-bold text-3xl mt-5 mb-5 text-center">
            Your current projects
          </h1>

          <div className="mx-auto">
            {projects.map(project => {
              return <ProjectItem key={project._id} project={project} />
            })}
          </div>
        </>
      ) : (
        <>
          <h1 className="font-bold text-3xl mt-5 mb-5 text-center">
            No Projects found
          </h1>
          <Link to="/createProject">
            <button className="w-full p-2 bg-white rounded text-black flex justify-center mt-4 border-2 border-black">
              <FaPencilAlt size={30} className="pt-1 mb-1" />
              <p className="text-xl ml-1">Create A Project</p>
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
export default Projects
