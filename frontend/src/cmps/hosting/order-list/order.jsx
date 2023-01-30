import { useState } from 'react'
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
  const [orderToEdit, setOrderToEdit] = useState(order)
  function onUpdateOrderStatus(status) {
    setOrderToEdit(prevOrder=> ({ ...prevOrder, status }))
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
        {orderToEdit.status === 'pending' && yellowDot}
        {orderToEdit.status === 'approved' && greenDot}
        {orderToEdit.status === 'rejected' && redDot}
        {orderToEdit.status === 'canceled' && redDot} {orderToEdit.status}
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
