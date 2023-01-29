import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { AppHeader } from '../cmps/header-footer/app-header'
import { Logo } from '../cmps/logo'
import { NavMenu } from '../cmps/nav-menu'
import { TripList } from '../cmps/trip-list/trip-list'
import { loadOrders } from '../store/order.action'

export function TripPage() {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const orders = useSelector((storeState) => storeState.orderModule.orders)
    // .filter((order) => order.buyer._id === loggedinUser._id)
    .sort((a, b) => b.startDate - a.startDate)
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )
  const navigate = useNavigate()

  useEffect(() => {
    loadOrders({ userId: loggedinUser._id })
  }, [loggedinUser])

  console.log('orders:', orders)
  if (!loggedinUser) navigate('/')
  return (
    <>
      {/* <AppHeader className='main-layout' /> */}
      <header className='app-header main-layout flex'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>
      {orders && (
        <section className='trip-page secondary-layout'>
          <div className='hero'>
            <h2>Welcome back, {loggedinUser.fullname}</h2>
          </div>
          <h3>Your trips</h3>
          <TripList orders={orders} isLoading={isLoading} />
        </section>
      )}
      <AppFooter className='main-layout fixed' />
    </>
  )
}
