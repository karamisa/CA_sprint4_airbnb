import { useState } from 'react'
import { Dot } from '../../../services/dots'
import { utilService } from '../../../services/util.service'
import { updateOrder } from '../../../store/order.action'
import { BtnSquare } from '../../ui/buttons/btn-square'
import { GuestCard } from '../../ui/cards/guest-card'
import { StayCard } from '../../ui/cards/stay-card'

export function Order({ order }) {
  const [orderToEdit, setOrderToEdit] = useState(order)
  function onUpdateOrderStatus(status) {
    setOrderToEdit((prevOrder) => ({ ...prevOrder, status }))
    updateOrder({ ...order, status })
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
        {order.status === 'pending' && Dot.yellow}
        {order.status === 'approved' && Dot.green}
        {order.status === 'canceled' && Dot.red}
        {order.status === 'completed' && Dot.brown}
        {order.status === 'rejected' && Dot.red} {order.status}
      </td>
      <td className='action-btns'>
        <BtnSquare
          className={orderToEdit.status === 'pending' ? '' : 'disable'}
          onClick={() => onUpdateOrderStatus('approved')}>
          Accept
        </BtnSquare>
        <BtnSquare
          className={orderToEdit.status === 'pending' ? '' : 'disable'}
          onClick={() => onUpdateOrderStatus('rejected')}>
          Reject
        </BtnSquare>
      </td>
    </>
  )
}
