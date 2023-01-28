// import { useOrderStatus } from '../../../customHooks/useOrderStatus'
import { updateOrder } from '../../../store/order.action'
import { BtnSquare } from '../../ui/buttons/btn-square'
import { GuestCard } from '../../ui/cards/guest-card'
import { StayCard } from '../../ui/cards/stay-card'

export function Order({ order }) {
  // const { orderForPrecessing, approveOrder, rejectOrder } =
  //   useOrderStatus(order)


  function onUpdateOrderStatus(status){
    updateOrder({...order, status})
  }

  if (!order) return <></>
  // console.log('order:', orderForPrecessing)
  return (
    <>
      <td>
        <GuestCard guest={order.buyer} />
      </td>
      {/* <td>{orderForPrecessing.buyer.fullname}</td> */}
      <td>
        {new Date(order.startDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
        -
        {new Date(order.endDate).toLocaleString('en-US', {
          day: 'numeric',
        })}
      </td>
      <td>
        <StayCard stay={order.stay} />
      </td>
      {/* <td>{orderForPrecessing.stay.name}</td> */}
      <td>{order.stay.price}</td>
      <td>{order.status}</td>
      <td>
        <BtnSquare onClick={() => onUpdateOrderStatus('approved')}>Accept</BtnSquare>
        <BtnSquare onClick={() => onUpdateOrderStatus('rejected')}>Reject</BtnSquare>
      </td>
    </>
  )
}
