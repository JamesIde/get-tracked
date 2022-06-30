export default function CalcTicketPriority(tickets) {
  let low = 0
  let medium = 0
  let high = 0

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].priority === "Low") {
      low++
    }
    if (tickets[i].priority === "Medium") {
      medium++
    }
    if (tickets[i].priority === "High") {
      high++
    }
  }
  // Create an array of objects with the priority and count
  const ticketPriorityCount = [
    {
      name: "Low",
      count: low,
    },
    {
      name: "Medium",
      count: medium,
    },
    {
      name: "High",
      count: high,
    },
  ]
  return ticketPriorityCount
}
