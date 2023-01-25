import { useOrderStatus } from '../../../customHooks/useOrderStatus'
import { BtnSquare } from '../../ui/buttons/btn-square'

export function Order({ order }) {
  const { orderForPrecessing, approveOrder, rejectOrder } =
    useOrderStatus(order)

  if (!orderForPrecessing) return <></>
  // console.log('order:', orderForPrecessing)
  return (
    <>
      <td>{orderForPrecessing.buyer.fullname}</td>
      <td>
        {new Date(orderForPrecessing.startDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
        -
        {new Date(orderForPrecessing.endDate).toLocaleString('en-US', {
          day: 'numeric',
        })}
      </td>
      <td>{orderForPrecessing.stay.name}</td>
      <td>{orderForPrecessing.stay.price}</td>
      <td>{orderForPrecessing.status}</td>
      <td>
        <BtnSquare onClick={() => approveOrder()}>Accept</BtnSquare>
        <BtnSquare onClick={() => rejectOrder()}>Reject</BtnSquare>
      </td>
    </>
  )
}
