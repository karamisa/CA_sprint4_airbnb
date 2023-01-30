import { BtnSquare } from '../ui/buttons/btn-square'
import { HostCard } from '../ui/cards/host-card'
import { StayCard } from '../ui/cards/stay-card'
import { updateOrder } from '../../store/order.action'
import { utilService } from '../../services/util.service'
import { Dot } from '../../services/dots'

export function Trip({ order }) {
  if (!order) return <></>

  function cancelOrder() {
    // console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

  console.log('order.stay:', order.stay)
  const startDate = new Date(order.startDate)
  const endDate = new Date(order.endDate)
  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const days = utilService.totalDays(order.startDate, order.endDate)

  return (
    <>
      <td>
        <StayCard stay={order.stay} />
      </td>
      <td>
        <HostCard host={order.stay.host} />
      </td>
      <td>
        {startDate.toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
        -
        {sameMonth
          ? endDate.toLocaleString('en-US', {
              day: 'numeric',
            })
          : endDate.toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
            })}
      </td>
      <td className='text-bold'>
        {utilService.formatCurrency(order.stay.price * days)}
      </td>
      <td>
        {order.status === 'pending' && Dot.yellow}
        {order.status === 'approved' && Dot.green}
        {order.status === 'canceled' && Dot.red}
        {order.status === 'completed' && Dot.brown}
        {order.status === 'rejected' && Dot.red} {order.status}
      </td>
      <td>
        <BtnSquare onClick={() => cancelOrder()}>Cancel</BtnSquare>
      </td>
    </>
  )
}
