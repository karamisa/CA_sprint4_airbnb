// import { useOrderStatus } from '../../customHooks/useOrderStatus'
import { BtnSquare } from '../ui/buttons/btn-square'
import { HostCard } from '../ui/cards/host-card'
import { StayCard } from '../ui/cards/stay-card'
import { updateOrder } from '../../store/order.action'

export function Trip({ order }) {
  // const { orderForPrecessing, cancelOrder } = useOrderStatus(order)
  // console.log('staydds:', stays)
  if (!order) return <></>
  // console.log('order:', orderForPrecessing)

  function cancelOrder(){
    console.log('cancel order')
    updateOrder({...order, status: 'canceled'})
  }

  return (
    <>
      <td>
        <StayCard stay={order.stay} />
      </td>
      {/* <td>{orderForPrecessing.stay.name}</td> */}
      <td>
        <HostCard host={order.stay.host} />
      </td>
      <td>
        {new Date(order.startDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
        -
        {new Date(order.endDate).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
      </td>
      <td>{order.stay.price}</td>
      <td>{order.status}</td>
      <td>
        <BtnSquare onClick={() => cancelOrder()}>Cancel</BtnSquare>
      </td>
    </>
  )
}
