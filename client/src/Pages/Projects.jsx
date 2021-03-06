import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProjects, reset } from "../features/projects/projectSlice"
import { Link } from "react-router-dom"
import { FaPencilAlt } from "react-icons/fa"
import Spinner from "../Components/Spinner"
import ProjectItem from "../Components/ProjectItem"
import { clearTickets } from "../features/tickets/ticketSlice"

function Projects() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.authReducer)
  const { projects, isLoading, isError, message, isSuccess } = useSelector(
    state => state.projectReducer
  )

  useEffect(() => {
    if (user) {
      dispatch(getProjects(user.token))
      dispatch(clearTickets())
      localStorage.removeItem("editProject")
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
    }
  }, [user, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="mx-auto h-full xl:w-8/12 lg:w-8/12 md:w-8/12 mt-5 p-1">
      {projects.length > 0 ? (
        <>
          <h1 className="font-bold text-3xl mt-5 mb-5 text-center">
            Your current projects
          </h1>
          <div className="mx-auto xl:w-3/4 w-full p-1 py-2">
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
            <button className="lg:w-2/4 p-2 bg-white rounded text-black flex justify-center mt-4 border-2 border-black mx-auto">
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
