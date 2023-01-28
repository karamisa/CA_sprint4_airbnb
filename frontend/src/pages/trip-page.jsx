import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { TripList } from '../cmps/trip-list/trip-list'
import { loadOrders } from '../store/order.action'

export function TripPage() {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const orders = useSelector((storeState) => storeState.orderModule.orders).filter(order => order.buyer._id === loggedinUser._id).sort((a,b) => b.startDate - a.startDate)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  const navigate= useNavigate()

  useEffect(() => {
    loadOrders({ userId: loggedinUser._id })
  }, [loggedinUser])


  if (!loggedinUser) navigate('/')
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
            isLoading={isLoading}
          />
        <AppFooter className='main-layout fixed' />
      </section>}
    </>
  )

}
