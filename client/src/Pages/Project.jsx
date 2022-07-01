import TicketItem from "../Components/TicketItem"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSngProject } from "../features/projects/projectSlice"
import {
  getTickets,
  clearTicket,
  addTicketPriority,
} from "../features/tickets/ticketSlice"
import Spinner from "../Components/Spinner"
import { clearComments } from "../features/comments/commentSlice"
import { FaPencilAlt } from "react-icons/fa"
import PieChart from "../Components/Charts/PieChart"
import CalcTicketPriority from "../Components/Charts/CalcTicketPriority"

function Project() {
  // Url params
  const { projectId } = useParams()
  const dispatch = useDispatch()

  const [ticketData, setTicketData] = useState()
  const [copyTicketData, setCopyTicketData] = useState()
  // Get access to global state
  const { project, isLoading, isError, message } = useSelector(
    state => state.projectReducer
  )
  const {
    tickets,
    Loading,
    Error,
    Message,
    ticketLoader,
    ticketPriorityCount,
  } = useSelector(state => state.ticketReducer)

  useEffect(() => {
    // Dispatch and set project to local storage
    dispatch(getSngProject(projectId))
    localStorage.setItem("editProject", JSON.stringify(project))

    // Get tickets with that project
    dispatch(getTickets(projectId))
    localStorage.setItem("tickets", JSON.stringify(ticketPriorityCount))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Clear any tickets stuck in state
    dispatch(addTicketPriority())

    dispatch(clearComments())
    dispatch(clearTicket())
  }, [dispatch])

  if (isLoading || Loading) {
    return <Spinner />
  }

  const checkTicketLoad = () => {
    const ticketGraph = JSON.parse(localStorage.getItem("tickets"))
  }

  return (
    <div className="xl:w-5/12 lg:w-10/12 md:w-10/12 mx-auto p-1">
      {/* <PieChart chartData={ticketData} /> */}

      <h1 className="font-bold text-3xl text-center mt-5 mb-2">
        Project Name: {project.name}
      </h1>
      <p className="mt-1 mb-2 text-center"> Project ID: {project._id}</p>
      <hr />
      <div className="flex flex-row justify-between">
        {project.status === "In Progress" ? (
          <p className="mt-1 mb-5 p-1 rounded bg-green-300 text-black font-bold">
            Status: {project.status}{" "}
          </p>
        ) : (
          <p className="mt-1 mb-5 p-1 rounded bg-red-600 text-black font-bold">
            Status: {project.status}{" "}
          </p>
        )}
        <Link to={`/${projectId}/edit`}>
          <button class=" border-[1px] border-black font-bold mt-1 mb-5 p-1 px-2 rounded inline-flex items-center hover:bg-gray-300 duration-500">
            <FaPencilAlt size={15} className="pt-1 mb-1" />

            <span>Edit Project</span>
          </button>
        </Link>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-col">
          <p className="font-bold mb-1 text-xl ">Project Description</p>
          <p>{project.description}</p>
        </div>
        <p className="p-2">
          Created{" "}
          <strong>{new Date(project.createdAt).toLocaleDateString()}</strong>
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <h5 className=" mt-4 font-bold text-xl">Current Tickets</h5>
        <Link to={`/${project._id}/createticket`}>
          <button class="bg-gray-100 border-2 font-bold p-1 mt-4 px-3 rounded inline-flex items-center hover:bg-gray-300 duration-500">
            <FaPencilAlt size={18} className="pt-1 mb-1" />

            <span>Create Ticket</span>
          </button>
        </Link>
      </div>
      <div className="mx-auto mt-4 mb-4">
        {tickets.length === 0 ? (
          <p className="text-center font-bold">No Tickets Found</p>
        ) : (
          <>
            {tickets.map(ticket => {
              return <TicketItem key={ticket._id} ticket={ticket} />
            })}
          </>
        )}
      </div>
    </div>
  )
}
export default Project
