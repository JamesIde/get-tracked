import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteTicket,
  getTickets,
  clearTicket,
} from "../features/tickets/ticketSlice"
import { Link } from "react-router-dom"
import Spinner from "../Components/Spinner"
import { toast } from "react-toastify"

function TicketItem({ ticket, projectId }) {
  const { Loading, Success } = useSelector(state => state.ticketReducer)
  const dispatch = useDispatch()
  const handleClick = ticketId => {
    if (
      window.confirm(
        "Are you sure you want to delete the ticket? This will delete all comments too"
      )
    ) {
      dispatch(deleteTicket(ticketId))
    }
    setTimeout(() => {
      dispatch(clearTicket())
    }, 1000)
  }

  if (Loading) {
    return <Spinner />
  }

  return (
    <div className="border-[1px] border-gray-400 rounded bg-gray-50 mt-2 mb-1 mx-1">
      <div className="flex flex-row justify-between m-1">
        <h1 className="font-bold text-lg mb-1">{ticket.title}</h1>
        <p className="m-1 text-center">
          {new Date(ticket.createdAt).toLocaleString("en-AU")}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="m-1 xl:w-3/4">{ticket.description}</p>
        <div className="m-1 p-1 px-2 rounded">
          <p>Status: {ticket.status}</p>
        </div>
      </div>
      <div className="flex xl:justify-between md:justify-between justify-between m-1">
        <Link to={`ticket/${ticket._id}`}>
          <button class="bg-blue-500 hover:bg-blue-900 duration-500 p-1 px-2 font-bold rounded inline-flex items-center text-white">
            <FaPencilAlt size={15} className="pt-1 mb-1 mr-1" />
            <span>View</span>
          </button>
        </Link>
        <button
          class="bg-red-600 p-1 px-2 font-bold rounded inline-flex items-center hover:bg-red-900 duration-500 text-white"
          onClick={() => handleClick(ticket._id)}
        >
          <FaTrashAlt size={15} className="pt-1 mb-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}
export default TicketItem
