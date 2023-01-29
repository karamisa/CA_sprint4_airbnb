import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChatOrderList } from '../cmps/chat/chat-order-list'
import { ChatRoom } from '../cmps/chat/chat-room'
import { Logo } from '../cmps/logo'
import { NavMenu } from '../cmps/nav-menu'
import { loadOrders } from '../store/order.action'


export function MessagesPage() {
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const [currOrder, setCurrOrder] = useState(null)
  console.log('currOrder', currOrder)

  useEffect(() => {
    loadOrders()
  }, [])

  function onSetCurrOrder(orderId) {
    const orderToSet = orders.find(order => order._id === orderId)
    setCurrOrder(orderToSet)
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <section className='messages-page'>

      {/* HEADER */}
      <div className='header-container'>
        <header className='app-header main-layout flex'>
          <div className='header-logo-container'>
            <Logo />
          </div>
          <div className='spacer'></div>
          <div className='header-menu-container'>
            <NavMenu />
          </div>
        </header>
      </div>

      {/* MAIN 3 Columns {orderList - messages - orderDetails} */}
      <div className="inbox-container">

      {/* Column 1 - Orders List/Select */}
        <div className="inbox-column orders-list">
          <div className="inbox-header">
            <h2>Orders</h2>
          </div>
          <div className="inbox-list">
            <ChatOrderList orders={orders} loggedInUser={loggedInUser} onSetCurrOrder={onSetCurrOrder} currOrder={currOrder} />
          </div>
        </div>


        {/* Column 2 - Messages */}
        <div className="inbox-column messages">
          <div className="inbox-header">
            <h2>Messages</h2>
          </div>
          {currOrder && <ChatRoom order={currOrder} />}
        </div>


        {/* Column 3 - Order Details */}
        <div className="inbox-column order-details">
          <div className="inbox-header">
            <h2>Order Details</h2>
          </div>
          {currOrder &&
            <div className="currOrder-details">
              <h3>{currOrder.stay.name}</h3>
              <p>Check in: {new Date(currOrder.startDate).toLocaleDateString()}</p>
              <p>Check out: {new Date(currOrder.endDate).toLocaleDateString()}</p>
              <p>Price: {currOrder.totalPrice}</p>
            </div>}
        </div>
      </div>
    </section>
  )
}
