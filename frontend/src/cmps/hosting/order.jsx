export function Order({ order }) {
  const handleChangeStatus = (id, status) => {
    // update the order status here
  };
  return (
    <>
      <td>{order.buyer.fullname}</td>
      <td>
        {order.endDate} - {order.startDate}
      </td>
      <td>{order.stay.name}</td>
      <td>{order.stay.price}</td>
      <td>{order.status}</td>
      <td>
        <button onClick={() => handleChangeStatus(order._id, 'Approved')}>
          Accept
        </button>
        <button onClick={() => handleChangeStatus(order._id, 'Declined')}>
          Descline
        </button>
      </td>
    </>
  );
}
