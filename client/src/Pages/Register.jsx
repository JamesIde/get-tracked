import { FaUser } from "react-icons/fa"

function Register() {
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
            <form>
              <div className="form-group-item">
                <label htmlFor="name" className="text-xl">
                  Name
                </label>
                <input
                  type="name"
                  placeholder="Enter your name"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  required
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
