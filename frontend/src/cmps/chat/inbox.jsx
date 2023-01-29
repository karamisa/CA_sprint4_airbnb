import { InputTextRounded } from '../ui/input/input-text-rounded'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../../services/socket.service'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../../store/order.action'
import { MsgPreview } from '../msg-preview'
import { orderService } from '../../services/order.service'

export function Inbox() {
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)

  const [msg, setMsg] = useState({ txt: '' })
  const [contact, setContact] = useState(null)
  const [groupedMessages, setGroupedMessages] = useState(null)



  function groupOrders() {
    if (!orders) return {}
    const groupedOrders = orders.reduce((acc, order) => {
      const key = (order.hostId === loggedInUser._id) ? order.buyer._id : order.hostId
      if (!acc[key]) {
        acc[key] = { msgs: [], orders: [] }
      }
      acc[key].orders.push(order)
      acc[key].msgs.push(...order.msgs)
      return acc
    }, {})
    for (const key in groupedOrders) {
      groupedOrders[key].msgs.sort((a, b) => a.createdAt - b.createdAt)
      groupedOrders[key].orders.sort((a, b) => a.createdAt - b.createdAt)
    }

    return groupedOrders
  }



  useEffect(() => {
    loadOrders()
    socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (!orders) return
    if (!loggedInUser) return
    const groupedOrders = groupOrders()
    const groupedMessages = Object.keys(groupedOrders).map(key => {
      const contact = groupedOrders[key].orders[0].hostId === loggedInUser._id ? groupedOrders[key].orders[0].buyer : groupedOrders[key].orders[0].stay.host
      contact.orderIdRef = groupedOrders[key].orders[0]._id
      contact.msgs = groupedOrders[key].msgs
      return contact
    }
    )
    console.log('groupedMessages', groupedMessages)
    setGroupedMessages(groupedMessages)
  }, [isLoading, orders, loggedInUser])


  // useEffect(() => {
  //   socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
  // }, [topic])

  function addMsg(newMsg) {
    setContact(prevContact => {
      if (!prevContact.msgs) {
        prevContact.msgs = []
      }
      return { ...prevContact, msgs: [...prevContact.msgs, newMsg] }
    })
  }

  async function sendMsg(ev) {
    ev.preventDefault()
    try {
      const by = loggedInUser || 'Guest'
      const newMsg = { by, txt: msg.txt }
      addMsg(newMsg)
      await orderService.addOrderMsg(contact.orderIdRef, newMsg)
      // socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
      // for now - we add the msg ourself
      setMsg({ txt: '' })
    } catch (err) {
      console.log('err', err)
    }
  }

  function handleFormChange(ev) {
    const { name, value } = ev.target
    setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
  }

  if (isLoading) return <div>Loading...</div>
  if (!groupedMessages) return <div>No messages yet</div>
  return (
    <section className='inbox-container'>
      <div className='contacts inbox-column left'>
        <div className='inbox-column-header'>
          <h2>Messages</h2>
        </div>
        {groupedMessages.map((contact, idx) => (
          <div className="msg-list-item" onClick={() => setContact(contact)} key={idx}>
            <MsgPreview contact={contact} />
          </div>
        ))}

      </div>
      <div className='chat  inbox-column'>
        <div className='inbox-column-header '>
          <h2>From Name</h2>
        </div>
        {!!contact && <div className='chat-msgs'>
          {/* {contact.msgs.map((msg, idx) => (<li key={idx}>{msg.by.fullname}: {msg.txt}</li>))} */}
          {contact.msgs.map((msg, idx) => (<div key={idx}>
            <div className="msg-full">
              <div className="msg-avatar">
                <img src={msg.by.imgUrl} alt={'avatar'} className="mini-user-img" />
              </div>
              <div className="msg-name">
                <div>{msg.by.fullname}</div>
                {/* <div>{msg?.createdAt}</div> */}
                </div>
              <div className="msg-txt">{msg?.txt}</div>
            </div>
          </div>))}

        </div>}
        <div className='chat-input'>
          <form onSubmit={sendMsg}>
            <input
              type="text" value={msg.txt} onChange={handleFormChange}
              name="txt" autoComplete="off" />
            <button>Send</button>
          </form>
        </div>
      </div>
      <div className='stay-info inbox-column right'>
        <div className='inbox-column-header '>
          <h2>Orders</h2>
        </div>
        {contact && orders.map((order, idx) => {
          if (order.buyer._id === contact._id || order.hostId === contact._id) {
            return (
              <div className="order-list-item" key={idx}>
                <h3>{order.stay.name}</h3>
                <p>Check in: {new Date(order.startDate).toLocaleDateString()}</p>
                <p>Check out: {new Date(order.endDate).toLocaleDateString()}</p>
                <p>Price: {order.totalPrice}</p>
              </div>
            )
          }
        })}

      </div>
    </section>
  )
}
