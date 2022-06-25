import { Link } from "react-router-dom"
function ProjectItem({ project }) {
  return (
    <div className="flex flex-col justify-between md:flex-row  border-2 mt-2">
      <h1 className="w-1/6">{project.name}</h1>
      <p className="w-2/5">{project.description}</p>
      <p>{new Date(project.createdAt).toLocaleDateString("en-AU")}</p>
      <div className="flex flex-row">
        <Link to={`/projects/${project._id}`}>
          <button class="bg-blue-500 hover:bg-blue-700 duration-500 text-white font-bold p-2 rounded m-1">
            View Project
          </button>
        </Link>
        <button
          class="bg-red-500 hover:bg-red-900 duration-500 text-white font-bold p-2 rounded m-1"
          //  onClick dispatch to delete the project
        >
          Delete Project
        </button>
      </div>
    </div>
  )
}
export default ProjectItem
