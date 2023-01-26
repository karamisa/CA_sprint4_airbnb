import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { TripList } from '../cmps/trip-list/trip-list'
import { orderService } from '../services/order.service.local'
import { stayService } from '../services/stay.service.local'
import { userService } from '../services/user.service.local'

export function TripPage() {
  const [orders, setOrders] = useState(null)
  const [hosts, setHosts] = useState(null)
  const [stays, setStays] = useState(null)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  // console.log('loggedinUser:', loggedinUser)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    loadHosts()
    loadStays()
  }, [orders])

  async function loadOrders() {
    try {
      const orders = await orderService.query({ buyerId: loggedinUser._id })
      // console.log('orders:', orders)
      setOrders(orders)
    } catch (err) {
      console.log('Cannot load orders: ', err)
    }
  }

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

  async function loadHosts() {
    const hostIds = [...new Set(orders.map((order) => order.hostId))]
    // console.log('hostIds:', hostIds)
    try {
      const hosts = await Promise.all(
        hostIds.map((hostId) => userService.get(hostId))
      )
      setHosts(hosts)
    } catch (err) {
      console.log('Cannot load hosts: ', err)
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
        <TripList
          stays={stays}
          hosts={hosts}
          orders={orders}
          setOrders={setOrders}
        />
      </div>
      <AppFooter className='main-layout fixed' />
    </section>
  )
}
