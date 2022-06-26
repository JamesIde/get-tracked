import { AiOutlineFundProjectionScreen } from "react-icons/ai"
import { FaPencilAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
function Home() {
  return (
    <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto">
      {/* Project and Ticket Summary eventually */}

      <div>
        <h1 className="font-bold text-3xl text-center text-gray-500 mt-5 mb-3">
          Project Manager App
        </h1>
        <p className="text-center">
          A project manager or bug tracker with tickets and comments
        </p>
      </div>

      <div className="w-3/4 mx-auto text-center xl:mt-16 lg:mt-16 md:mt-14">
        <Link to="/projects">
          <button className="w-full p-2 bg-black rounded text-white flex justify-center">
            <AiOutlineFundProjectionScreen size={30} className="pt-1 mb-1" />
            <p className="text-xl ml-1">View All Projects</p>
          </button>
        </Link>
        <Link to="/createProject">
          <button className="w-full p-2 bg-white rounded text-black flex justify-center mt-4 border-2 border-black">
            <FaPencilAlt size={30} className="pt-1 mb-1" />
            <p className="text-xl ml-1">Create A Project</p>
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
