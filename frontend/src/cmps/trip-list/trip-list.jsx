import { Trip } from './trip'

export function TripList({ orders }) {
  if (!orders) return <div></div>
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Stay</th>
            <th>Host</th>
            <th>Dates</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <Trip order={order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
