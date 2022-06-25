import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"
function TicketItem({ ticket }) {
  return (
    <div className="border-[1px] border-gray-400 rounded bg-gray-100">
      <div className="flex flex-row justify-between m-1">
        <h1 className="font-bold text-lg mb-1">{ticket.title}</h1>
        <p className="m-1">
          {new Date(ticket.createdAt).toLocaleString("en-AU")}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="m-1">{ticket.description}</p>
        <div className="m-1">
          <p>Status: {ticket.status}</p>
        </div>
      </div>
      <div className="flex justify-between m-1">
        <button class="bg-gray-400 hover:bg-gray-600 duration-500 p-1 px-2 font-bold rounded inline-flex items-center ">
          <FaPencilAlt size={15} className="pt-1 mb-1" />
          <span>Edit Ticket</span>
        </button>
        <button class="bg-red-500 p-1 px-2 font-bold rounded inline-flex items-center hover:bg-red-900 duration-500">
          <FaTrashAlt size={15} className="pt-1 mb-1" />
          <span>Delete Ticket</span>
        </button>
      </div>
    </div>
  )
}
export default TicketItem
