// import { useOrderStatus } from '../../../customHooks/useOrderStatus'
import { orderService } from '../../../services/order.service'
import { utilService } from '../../../services/util.service'
import { updateOrder } from '../../../store/order.action'
import { BtnSquare } from '../../ui/buttons/btn-square'
import { GuestCard } from '../../ui/cards/guest-card'
import { StayCard } from '../../ui/cards/stay-card'

const greenDot = (
  <svg
    viewBox='0 0 16 16'
    role='presentation'
    aria-hidden='true'
    focusable='false'
    style={{ height: '10px', width: '10px', fill: '#00ff00' }}>
    <ellipse cx='8' cy='8' fillRule='evenodd' rx='8' ry='8'></ellipse>
  </svg>
)
const redDot = (
  <svg
    viewBox='0 0 16 16'
    role='presentation'
    aria-hidden='true'
    focusable='false'
    style={{ height: '10px', width: '10px', fill: '#ff0000' }}>
    <ellipse cx='8' cy='8' fillRule='evenodd' rx='8' ry='8'></ellipse>
  </svg>
)
const yellowDot = (
  <svg
    viewBox='0 0 16 16'
    role='presentation'
    aria-hidden='true'
    focusable='false'
    style={{ height: '10px', width: '10px', fill: '#ffc400' }}>
    <ellipse cx='8' cy='8' fillRule='evenodd' rx='8' ry='8'></ellipse>
  </svg>
)

export function Order({ order }) {
  function onUpdateOrderStatus(status) {
    updateOrder({ ...order, status })
    orderService.addOrderMsg(order._id, {
      txt: `Your order has been ${status}`,
      by: 'host',
    })
  }

  const startDate = new Date(order.startDate)
  const endDate = new Date(order.endDate)
  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const days = utilService.totalDays(order.startDate, order.endDate)

  if (!order) return
  return (
    <>
      <td>
        <GuestCard guest={order.buyer} />
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
      <td>
        <StayCard stay={order.stay} />
      </td>
      <td className='text-bold'>
        {utilService.formatCurrency(order.stay.price * days)}
      </td>
      <td className='order-status'>
        {order.status === 'pending' && yellowDot}
        {order.status === 'approved' && greenDot}
        {order.status === 'rejected' && redDot}
        {order.status === 'canceled' && redDot} {order.status}
      </td>
      <td className='action-btns'>
        <BtnSquare onClick={() => onUpdateOrderStatus('approved')}>
          Accept
        </BtnSquare>
        <BtnSquare onClick={() => onUpdateOrderStatus('rejected')}>
          Reject
        </BtnSquare>
      </td>
    </>
  )
}
