import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, reset } from "../features/auth/authSlice"
import { useEffect } from "react"
function Header() {
  const { user } = useSelector(state => state.authReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = e => {
    dispatch(logoutUser())
    setTimeout(() => {
      reset()
    }, 2100)
    navigate("/")
  }

  return (
    <>
      <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto ">
        <div className="flex mt-5 mb-5">
          <div className="flex-1">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl hover:text-gray-900 p-2">
                  Project Manager
                </h1>
              </Link>
            </div>
          </div>
          <div>
            {user ? (
              <div className="">
                <h1 className="mt-4 mr-4">
                  Welcome, <strong> {user.name}</strong>
                </h1>
                <Link to="/">
                  <button
                    class="flex items-center ml-2 mr-2 "
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    <h1 className="pl-2 text-lg">Signout</h1>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex-row">
                <Link to="/login">
                  <button
                    type="submit"
                    class="flex items-center ml-2 mr-2 flex-row"
                  >
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
              </div>
            )}
          </div>
        </div>
        <hr />
      </div>
    </>
  )
}
export default Header
