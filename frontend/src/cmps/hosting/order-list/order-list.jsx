import { Order } from './order'

export function OrderList({ stays, orders }) {
  if (!orders) return <div></div>
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Dates</th>
            <th>Stay</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <Order stays={stays} order={order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
