import { TableLoader } from '../ui/table-loader'
import { Trip } from './trip'

export function TripList({ orders, isLoading }) {
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
        {isLoading && <TableLoader />}
        {!isLoading && orders.map((order) => (
            <tr key={order._id}>
              <Trip order={order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
