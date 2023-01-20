import { useOrderStatus } from '../../customHooks/useOrderStatus';

export function Trip({ order }) {
  const { orderForPrecessing, cancelOrder } = useOrderStatus(order);

  if (!orderForPrecessing) return <></>;
  console.log('order:', orderForPrecessing);
  return (
    <>
      <td>{orderForPrecessing.stay.name}</td>
      <td>
        {orderForPrecessing.endDate} - {orderForPrecessing.startDate}
      </td>
      <td>{orderForPrecessing.stay.price}</td>
      <td>{orderForPrecessing.status}</td>
      <td>
        <button onClick={() => cancelOrder()}>Cancel</button>
      </td>
    </>
  );
}
