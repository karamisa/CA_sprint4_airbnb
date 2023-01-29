import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { orderService } from '../../services/order.service'


import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_USER_IS_TYPING, SOCKET_EVENT_USER_IS_TYPING } from '../../services/socket.service'

export function ChatRoom({ order }) {
    console.log(order)
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [typingUser, setTypingUser] = useState()

    const loggedInUser = useSelector(storeState => storeState.userModule.user)


    useEffect(() => {
        if (!order) return
        setMsgs([...order.msgs])
        socketService.emit(SOCKET_EMIT_SET_TOPIC, order._id)
        socketService.on(SOCKET_EVENT_USER_IS_TYPING, onSetTypingUser)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [order])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function onSetTypingUser(fullname) {
        setTypingUser(fullname)
        //need to add a debounce. (not quite debounce but same concept)
        setTimeout(() => setTypingUser(null), 1000)
    }

   async function sendMsg(ev) {
        ev.preventDefault()
        try{
        const by = loggedInUser || 'Me'
        const newMsg = { by, txt: msg.txt}
        setMsg({ txt: '' })
        await orderService.addOrderMsg(order._id, newMsg)
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // for now - we add the msg ourself
        } catch (err) {
            console.log('err', err)
        }
        
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        socketService.emit(SOCKET_EMIT_USER_IS_TYPING, loggedInUser?.fullname || 'guest')
    }

    return (
        <section className="chat-room">
          {msgs.map((msg, idx) => (<div key={idx}>
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

            {typingUser && <p>{typingUser} is typing...</p>}

            <div className='chat-input'>
                <form onSubmit={sendMsg}>
                    <input
                        type="text" value={msg.txt} onChange={handleFormChange}
                        name="txt" autoComplete="off" />
                    <button>Send</button>
                </form>
            </div>
        </section>
    )
}