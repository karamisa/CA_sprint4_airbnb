import { utilService } from "../../services/util.service"

export function ChatOrderPreview({ order, onSetCurrOrder, currOrder, loggedInUser }) {
    const className = (currOrder && currOrder._id === order._id) ? 'chat-order-preview active' : 'chat-order-preview'
    const contact = order.hostId === loggedInUser._id ? order.buyer : order.stay.host

    let hours
    let minutes
    if (order.msgs[order.msgs.length - 1]?.createdAt) {
        const msgTime = new Date(order.msgs[order.msgs.length - 1]?.createdAt)
        hours = msgTime.getHours()
        minutes = msgTime.getMinutes() < 10 ? '0' + msgTime.getMinutes() : msgTime.getMinutes()
    }

    let orderMsg
    if (order.msgs[order.msgs.length - 1]?.txt) {
    const msgTxt = order.msgs[order.msgs.length - 1]?.txt
    orderMsg = msgTxt.length > 50 ? msgTxt.substring(0, 50) + '...' : msgTxt
    }



  const checkInDate = utilService.ShortFormattedDate(order.startDate)  
  const checkOutnDate = utilService.ShortFormattedDate(order.endDate)  

  return (
      <>
      <div className={className} onClick={() => { onSetCurrOrder(order._id) }}>
            <div className="chat-order-avatar">
                <img src={contact.imgUrl} alt={'avatar'} className="mini-user-img" />
            </div>
            <div className="chat-order-details flex">
                <div className="chat-order-status flex justify-between">
                    <span className={`chat-show-status ${order.status}`}>{order.status}</span>
                    {(order.msgs[order.msgs.length - 1]?.createdAt) &&<span className="chat-order-time">{hours}:{minutes}</span>}
                </div>

                <div className="chat-order-name">{contact.fullname}</div>
                <div className="chat-order-msg">{orderMsg}</div>

                <div className="chat-mini-details flex justify-between">
                <span className="chat-mini-booking">{checkInDate}-{checkOutnDate}</span> <span className="chat-mini-type">{order.stay.type}</span>
                </div>
            </div>

        </div>
            {/* <div className="chat-place-name border-buttom">{order.stay.name}</div> */}
      </>
    )
}

