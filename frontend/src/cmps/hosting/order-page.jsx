import { useEffect } from 'react'
import { OrderList } from './order-list/order-list'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../../store/order.action'
import { REMOVE_NOTIFICATION } from '../../store/user.reducer'

export function OrderPage() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const dispatch = useDispatch()
  const orders = useSelector(
    (storeState) => storeState.orderModule.orders
  ).filter((order) => order.hostId === user._id)
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )

  useEffect(() => {
    loadOrders()
    dispatch({type: REMOVE_NOTIFICATION, notificationType: 'order'})
  }, [])

  return (
    <div className='secondary-layout order-page'>
      <div className='hero'>
        <h2>Welcome back, {loggedinUser.fullname}</h2>
      </div>
      <h3>Orders</h3>
      <OrderList orders={orders} isLoading={isLoading} />
    </div>
  )
}
