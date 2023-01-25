import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { TripList } from '../cmps/trip-list/trip-list'
import { orderService } from '../services/order.service'

export function TripPage() {
  const [orders, setOrders] = useState(null)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  // console.log('loggedinUser:', loggedinUser)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const orders = await orderService.query({ buyerId: loggedinUser._id })
      console.log('orders:', orders)
      setOrders(orders)
    } catch (err) {
      console.log('Cannot load orders: ', err)
    }
  }
  return (
    <section className='main-layout'>
      <AppHeader className='main-layout' />
      <div className='secondary-layout trip-page'>
        <div className='hero'>
          <h2>Welcome</h2>
        </div>
        <h3>Your trips</h3>
        <TripList orders={orders} setOrders={setOrders} />
      </div>
      <AppFooter className='main-layout fixed' />
    </section>
  )
}
