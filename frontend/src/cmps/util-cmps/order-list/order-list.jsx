import { Order } from './order';

export function OrderList({ orders }) {
  if (!orders) return <div></div>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Buyer Name</th>
            <th>Dates</th>
            <th>Stay</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <Order order={order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
