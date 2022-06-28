import { FaUser } from "react-icons/fa"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../Components/Spinner"
function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.authReducer
  )

  const onSubmit = e => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      // alert("Passwords do not match")
      toast.error("Passwords do not match")
    }

    const formData = {
      name,
      email,
      password,
      password2: confirmPassword,
    }

    dispatch(registerUser(formData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (user) {
      navigate("/projects")
      toast.success(message)
      reset()
    }
  }, [isError, isSuccess, message, navigate, user])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto ">
        <div className="text-center mt-10 mb-5 flex items-center justify-center">
          <FaUser size={30} className="mr-2" />
          <h1 className="text-4xl font-bold">Register</h1>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400">
            Please fill out the form below to register
          </p>
        </div>
        <div className="w-8/12 mx-auto mt-12">
          <div className="form-group">
            <form onSubmit={onSubmit}>
              <div className="form-group-item">
                <label htmlFor="name" className="text-xl">
                  Name
                </label>
                <input
                  type="name"
                  placeholder="Enter your name"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  required
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4">
                <label htmlFor="email" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  required
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4">
                <label htmlFor="password" className="text-xl">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  required
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4">
                <label htmlFor="password" className="text-xl">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Please confirm your password"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  required
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value)
                  }}
                />
              </div>
              <button className="w-full bg-black text-white rounded p-2 mt-4">
                <p className="text-xl">Register</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
