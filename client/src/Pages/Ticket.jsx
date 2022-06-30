import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getSingleTicket } from "../features/tickets/ticketSlice"
import { getComments, createComment } from "../features/comments/commentSlice"
import Spinner from "../Components/Spinner"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
function Ticket() {
  const ticketId = useParams().ticketId
  const dispatch = useDispatch()
  const { ticket, Success } = useSelector(state => state.ticketReducer)
  const { project } = useSelector(state => state.projectReducer)
  const { comments, isLoading } = useSelector(state => state.commentReducer)
  const [comment, setComment] = useState("")

  useEffect(() => {
    dispatch(getSingleTicket(ticketId))
    dispatch(getComments(ticketId))
  }, [dispatch])

  const handleClick = () => {
    setComment("")
  }

  const handleCreateClick = () => {
    if (comment === "" || comment === undefined) {
      toast.error("Please enter a comment")
    } else {
      dispatch(createComment(comment))
      handleClick()
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="xl:w-6/12 lg:w-10/12 md:w-10/12 mx-auto p-1">
      <h1 className="font-bold xl:text-3xl md:text-3xl text-xl text-center mt-5 mb-2">
        Ticket: {ticket.title}
      </h1>
      <div className="grid grid-cols-2 grid-flow-row gap-2 md:grid-cols-2 lg:grid-cols-4 px-1 ">
        <div className="w-full ">
          <div>
            <h5 className="text-xl font-bold xl:mb-4 md:mb-4 mb-1">Project</h5>
          </div>
          {project.name}
        </div>
        <div>
          <div>
            <h5 className="text-xl font-bold xl:mb-4 md:mb-4 mb-1">Priority</h5>
          </div>
          {ticket.priority}
        </div>
        <div>
          <div>
            <h5 className="text-xl font-bold xl:mb-4 md:mb-4 mb-1">Status</h5>
          </div>
          {ticket.status}
        </div>
        <div>
          <div>
            <h5 className="text-xl font-bold xl:mb-4 md:mb-4 mb-1">
              Created At
            </h5>
          </div>
          {new Date(ticket.createdAt).toLocaleString("en-AU")}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="p-1">
          <h5 className="text-xl font-bold mb-4 mt-5">Description</h5>
          <p>{ticket.description}</p>
        </div>
        <div className="xl:text-right md:text-right text-center">
          <Link to={`/projects/${project._id}`}>
            <button class="bg-gray-100 border-2 font-bold p-1 mb-4 mt-5 rounded inline-flex items-center hover:bg-gray-300 duration-500">
              <span>Back to Project</span>
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <h5 className="text-xl font-bold mb-4 mt-5">Add Comment</h5>
          <textarea
            name="content"
            id="content"
            cols="45"
            rows="5"
            className="border-2 rounded p-1"
            value={comment}
            onChange={e => setComment(e.target.value)}
          ></textarea>
          <div className="flex flex-row ">
            <p
              className="bg-red-700 hover:bg-red-900 hover:cursor-pointer duration-500 text-white font-bold  px-2 py-2 mr-2 rounded w-fit"
              onClick={handleClick}
            >
              Cancel
            </p>
            <p
              className="bg-purple-500 hover:bg-purple-900 hover:cursor-pointer duration-500 text-white font-bold px-2 py-2  rounded w-fit"
              onClick={handleCreateClick}
            >
              Add
            </p>
          </div>
        </div>
        <div>
          {comments.length === 0 ? (
            <p>No Comments</p>
          ) : (
            <>
              <h5 className="text-xl font-bold mb-4 mt-5">Comments</h5>
              {comments.map(comment => {
                return (
                  <>
                    <div className="mb-2">
                      <div className="xl: xl:w-2/4 md:w-2/4 w-full">
                        <p className="text-md font-bold">{comment.userEmail}</p>
                        <p className="text-sm text-gray-500 mt-1 mb-4">
                          {new Date(comment.createdAt).toLocaleString("en-AU")}
                        </p>
                        <p className="mb-2 mt-2">{comment.content}</p>
                        <hr />
                      </div>
                    </div>
                  </>
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Ticket
