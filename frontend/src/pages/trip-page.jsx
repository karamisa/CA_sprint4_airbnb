import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppFooter } from '../cmps/header-footer/app-footer'
import { Logo } from '../cmps/logo'
import { NavMenu } from '../cmps/nav-menu'
import { TripList } from '../cmps/trip-list/trip-list'
import { loadOrders } from '../store/order.action'
import { REMOVE_NOTIFICATION } from '../store/user.reducer'

export function TripPage() {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const orders = useSelector(
    (storeState) => storeState.orderModule.orders
  ).sort((a, b) => b.startDate - a.startDate)
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loadOrders({ userId: loggedinUser._id })
    dispatch({type: REMOVE_NOTIFICATION, notificationType: 'order'})
  }, [loggedinUser])

  console.log('orders:', orders)
  if (!loggedinUser) navigate('/')
  return (
    <>
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
