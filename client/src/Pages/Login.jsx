import { FaSignInAlt } from "react-icons/fa"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
// Language: javascript
import Spinner from "../Components/Spinner"
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.authReducer
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // Redirect when logged in
    // When success is true/user has something in it
    if (user) {
      navigate("/")
      toast.success(message)
    }
    //Clear state
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = {
      email,
      password,
    }
    dispatch(loginUser(formData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto ">
        <div className="text-center mt-10 mb-5 flex items-center justify-center">
          <FaSignInAlt size={30} className="mr-2" />
          <h1 className="text-4xl font-bold">Login</h1>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400">
            Please enter your credentials
          </p>
        </div>
        <div className="w-8/12 mx-auto mt-12">
          <div className="form-group">
            <form onSubmit={handleSubmit}>
              <div className="form-group-item">
                <label htmlFor="name" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4">
                <label htmlFor="name" className="text-xl">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <button className="w-full bg-black text-white rounded p-2 mt-4">
                <p className="text-xl">Login</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
