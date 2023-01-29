// import { useOrderStatus } from '../../customHooks/useOrderStatus'
import { BtnSquare } from '../ui/buttons/btn-square'
import { HostCard } from '../ui/cards/host-card'
import { StayCard } from '../ui/cards/stay-card'
import { updateOrder } from '../../store/order.action'
import { utilService } from '../../services/util.service'

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

export function Trip({ order }) {
  if (!order) return <></>

  function cancelOrder() {
    console.log('cancel order')
    updateOrder({ ...order, status: 'canceled' })
  }

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
        {order.status === 'pending' && yellowDot}
        {order.status === 'approved' && greenDot}
        {order.status === 'rejected' && redDot} {order.status}
      </td>
      <td>
        <BtnSquare onClick={() => cancelOrder()}>Cancel</BtnSquare>
      </td>
    </>
  )
}
