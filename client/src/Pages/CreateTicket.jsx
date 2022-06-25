import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { createTicket } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { FaPencilAlt, FaProjectDiagram } from "react-icons/fa"
import ticketService from "../features/tickets/ticketService"
function CreateTicket() {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const projectId = useParams().projectId

  const { user } = useSelector(state => state.authReducer)
  const { Loading, Error, Message, Success } = useSelector(
    state => state.ticketReducer
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!title || !description) {
      toast.error("Please fill in all fields")
    }
    const ticketData = {
      title,
      description,
    }
    dispatch(createTicket(ticketData))
    navigate(`/projects/${projectId}`)
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

              <button
                className="w-full bg-black text-white rounded p-2 mt-4"
                type="submit"
              >
                <p className="text-xl">Create Ticket</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateTicket
