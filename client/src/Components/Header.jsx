import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
function Header() {
  return (
    <>
      <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto ">
        <div className="flex mt-5 mb-5">
          <div className="flex-1">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl hover:text-gray-900">
                  Project Manager
                </h1>
              </Link>
            </div>
          </div>
          <div className="flex">
            <Link to="/login">
              <button type="submit" class="flex items-center ml-2 mr-2">
                <FaSignInAlt />
                <h1 className="px-2  text-xl">Login</h1>
              </button>
            </Link>
            <Link to="/register">
              <button class="flex items-center ml-2 mr-2">
                <FaUser />
                <h1 className="px-2 text-xl">Register</h1>
              </button>
            </Link>
            {/* <button class="flex items-center ml-2 mr-2">
              <FaSignOutAlt />
              <h1 className="px-2 text-xl">Logout</h1>
            </button> */}
          </div>
        </div>
        <hr />
      </div>
    </>
  )
}
export default Header
