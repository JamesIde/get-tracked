import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { createTicket } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { FaPencilAlt, FaProjectDiagram } from "react-icons/fa"
import { reset } from "../features/projects/projectSlice"
import Spinner from "../Components/Spinner"
function CreateTicket() {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [priority, setPriority] = useState()

  const projectId = useParams().projectId

  const { Loading, Error, Message, Success } = useSelector(
    state => state.ticketReducer
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!title || !description || !priority || priority === undefined) {
      toast.error("Please fill in all fields")
    }
    const ticketData = {
      title,
      description,
      priority,
    }
    dispatch(createTicket(ticketData))
    navigate(`/projects/${projectId}`)
  }

  if (Loading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto ">
        <div className="text-center mt-10 mb-5 flex items-center justify-center">
          <FaPencilAlt size={30} className="mr-2" />
          <h1 className="text-4xl font-bold">Create Ticket</h1>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400">
            Tell us about the ticket
          </p>
        </div>
        <div className="w-8/12 mx-auto mt-12">
          <div className="form-group">
            <form onSubmit={handleSubmit}>
              <div className="form-group-item">
                <label htmlFor="ticketTitle" className="text-xl">
                  Ticket Title
                </label>
                <input
                  type="ticketTitle"
                  placeholder="Give the ticket a title"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  min="3"
                  value={title}
                  id="title"
                  onChange={e => {
                    setTitle(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4">
                <label htmlFor="ticketDescription" className="text-xl">
                  Ticket Description
                </label>
                <textarea
                  name="ticketDescription"
                  id="description"
                  className="border-[1px] rounded mt-1 mb-2 w-full p-1 text-md"
                  placeholder="Tell us a bit more about the ticket"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value)
                  }}
                />
              </div>
              <div className="form-group-item mt-4"></div>
              <label htmlFor="ticketPriority" className="text-xl">
                Ticket Priority
              </label>
              <select
                name="ticketPriority"
                id="priority"
                className="w-full border-[1px] p-1 mb-2 mt-1 rounded"
                value={priority}
                onChange={e => {
                  setPriority(e.target.value)
                }}
              >
                <option value="">Select a priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                className="w-full bg-black text-white rounded p-2 mt-4"
                type="submit"
              >
                <p className="text-xl">Create Ticket</p>
              </button>
              <Link to={`/projects/${projectId}`}>
                <button
                  className="w-full bg-white text-black rounded p-2 mt-4 border-2 border-black"
                  type="submit"
                >
                  <p className="text-xl">Cancel</p>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateTicket
