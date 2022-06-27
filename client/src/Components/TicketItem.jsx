import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteTicket,
  getTickets,
  clearTicket,
} from "../features/tickets/ticketSlice"
import { Link } from "react-router-dom"
import Spinner from "../Components/Spinner"

function TicketItem({ ticket, projectId }) {
  const { Loading, Success } = useSelector(state => state.ticketReducer)
  const dispatch = useDispatch()
  const handleClick = ticketId => {
    dispatch(deleteTicket(ticketId))
  }

  if (Loading) {
    return <Spinner />
  }

  return (
    <div className="border-[1px] border-gray-400 rounded bg-gray-50 mt-2 mb-1 mx-1">
      <div className="flex flex-row justify-between m-1">
        <h1 className="font-bold text-lg mb-1">{ticket.title}</h1>
        <p className="m-1">
          {new Date(ticket.createdAt).toLocaleString("en-AU")}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="m-1 xl:w-3/4">{ticket.description}</p>
        <div className="m-1 p-1 px-2 rounded">
          <p>Status: {ticket.status}</p>
        </div>
      </div>
      <div className="flex justify-between m-1">
        <Link to={`ticket/${ticket._id}`}>
          <button class="bg-gray-400 hover:bg-gray-600 duration-500 p-1 px-2 font-bold rounded inline-flex items-center ">
            <FaPencilAlt size={15} className="pt-1 mb-1 mr-1" />
            <span>View Ticket</span>
          </button>
        </Link>
        <button
          class="bg-red-600 p-1 px-2 font-bold rounded inline-flex items-center hover:bg-red-900 duration-500"
          onClick={() => handleClick(ticket._id)}
        >
          <FaTrashAlt size={15} className="pt-1 mb-1" />
          <span>Delete Ticket</span>
        </button>
      </div>
    </div>
  )
}
export default TicketItem
