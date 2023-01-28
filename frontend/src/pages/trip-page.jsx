import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { TripList } from '../cmps/trip-list/trip-list'
import { loadOrders } from '../store/order.action'

export function TripPage() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadOrders({ buyerId: loggedinUser._id })
  }, [loggedinUser])


  return (
    <>
      <AppHeader className='main-layout' />
      {orders && <section className='trip-page main-layout'>
          <div className='hero'>
            <h2>Welcome</h2>
          </div>
          <h3>Your trips</h3>
          <TripList
            orders={orders}
          />
        <AppFooter className='main-layout fixed' />
      </section>}
    </>
  )

}
