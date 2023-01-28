import { useEffect } from 'react'
import { OrderList } from './order-list/order-list'
import { useSelector } from 'react-redux'
import { loadOrders } from '../../store/order.action'

export function OrderPage() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = useSelector((storeState) => storeState.userModule.user)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  useEffect(() => {
    loadOrders({ hostId: user._id })
  }, [])

  return (
    <div className='secondary-layout order-page'>
      <div className='hero'>
        <h2>Welcome back</h2>
      </div>
      <h3>Orders</h3>
      <OrderList orders={orders} isLoading={isLoading} />
    </div>
  )
}
