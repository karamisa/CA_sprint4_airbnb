import { useOrderStatus } from '../../../customHooks/useOrderStatus';

export function Order({ order }) {
  const { orderForPrecessing, approveOrder, rejectOrder } =
    useOrderStatus(order);

  if (!orderForPrecessing) return <></>;
  console.log('order:', orderForPrecessing);
  return (
    <>
      <td>{orderForPrecessing.buyer.fullname}</td>
      <td>
        {orderForPrecessing.endDate} - {orderForPrecessing.startDate}
      </td>
      <td>{orderForPrecessing.stay.name}</td>
      <td>{orderForPrecessing.stay.price}</td>
      <td>{orderForPrecessing.status}</td>
      <td>
        <button onClick={() => approveOrder()}>Accept</button>
        <button onClick={() => rejectOrder()}>Reject</button>
      </td>
    </>
  );
}
