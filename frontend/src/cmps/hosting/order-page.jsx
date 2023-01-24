import { useEffect, useState } from 'react'
import { orderService } from '../../services/order.service'
import { OrderList } from './order-list/order-list'
import { useSelector } from 'react-redux'

export function OrderPage() {
  const [orders, setOrders] = useState(null)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  // console.log('loggedinUser:', loggedinUser)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const orders = await orderService.query({ hostId: loggedinUser._id })
      console.log('orders:', orders)
      setOrders(orders)
    } catch (err) {
      console.log('Cannot load orders: ', err)
    }
  }
  return (
    <div className='secondary-layout order-page'>
      <div className='hero'>
        <h2>Welcome back</h2>
      </div>
      <h3>Orders</h3>
      <OrderList orders={orders} setOrders={setOrders} />
    </div>
  )
}
