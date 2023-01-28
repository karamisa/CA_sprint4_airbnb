import { InputTextRounded } from '../ui/input/input-text-rounded'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../../services/socket.service'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../../store/order.action'

export function Inbox() {
  const [msg, setMsg] = useState({ txt: '' })
  const [msgs, setMsgs] = useState([])
  const [topic, setTopic] = useState('Love')
  const [isBotMode, setIsBotMode] = useState(false)

  const loggedInUser = useSelector(storeState => storeState.userModule.user)

  const botTimeoutRef = useRef()

  useEffect(() => {
    loadOrders({buyerId: loggedInUser._id})
    socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
      botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
  }, [topic])

  function addMsg(newMsg) {
    setMsgs(prevMsgs => [...prevMsgs, newMsg])
  }

  function sendBotResponse() {
    // Handle case: send single bot response (debounce).
    botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    botTimeoutRef.current = setTimeout(() => {
      setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
    }, 1250)
  }

  function sendMsg(ev) {
    ev.preventDefault()
    const from = loggedInUser?.fullname || 'Me'
    const newMsg = { from, txt: msg.txt }
    socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
    if (isBotMode) sendBotResponse()
    // for now - we add the msg ourself
    addMsg(newMsg)
    setMsg({ txt: '' })
  }

  function handleFormChange(ev) {
    const { name, value } = ev.target
    setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
  }
  return (
    <section className='inbox-container main-layout'>
      <div className='contacts inbox-column'>
        <div className='inbox-column-header '>
          <h2>Messages</h2>
          <label>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label>
        </div>
      </div>
      <div className='chat  inbox-column'>
        <div className='inbox-column-header '>
          <h2>From Name</h2>
        </div>
        <div className='chat-msgs'>
          <div className='inbox-column-header '>
            {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
          </div>
        </div>
        <div className='chat-input'>
          <form onSubmit={sendMsg}>
            <input
              type="text" value={msg.txt} onChange={handleFormChange}
              name="txt" autoComplete="off" />
            <button>Send</button>
          </form>
          {/* <InputTextRounded /> */}
        </div>
      </div>
      <div className='stay-info inbox-column'>
        <div className='inbox-column-header '>
          <h2>Details</h2>
        </div>
      </div>
    </section>
  )
}
