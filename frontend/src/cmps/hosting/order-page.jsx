import { useEffect, useState } from 'react'
import { orderService } from '../../services/order.service.local'
import { OrderList } from './order-list/order-list'
import { useSelector } from 'react-redux'
import { stayService } from '../../services/stay.service.local'

export function OrderPage() {
  const [orders, setOrders] = useState(null)
  const [stays, setStays] = useState(null)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  // console.log('loggedinUser:', loggedinUser)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    loadStays()
  }, [orders])

  async function loadStays() {
    const staysIds = [...new Set(orders.map((order) => order.stay._id))]
    // console.log('staysIds:', staysIds)
    try {
      const stays = await Promise.all(
        staysIds.map((stayId) => stayService.getById(stayId))
      )
      setStays(stays)
    } catch (err) {
      console.log('Cannot load stays: ', err)
    }
  }

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
      <OrderList stays={stays} orders={orders} setOrders={setOrders} />
    </div>
  )
}
