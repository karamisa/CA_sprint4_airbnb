export function ChatOrderPreview({ order, onSetCurrOrder, currOrder, loggedInUser }) {
    const className = (currOrder && currOrder._id === order._id) ? 'chat-order-preview active' : 'chat-order-preview'
    const contact = order.hostId === loggedInUser._id ? order.buyer : order.stay.host
    return (
        <div className={className} onClick={() => { onSetCurrOrder(order._id) }}>
            <div className="chat-order-avatar">
                <img src={contact.imgUrl} alt={'avatar'} className="mini-user-img" />
            </div>
            <div className="chat-order-name">{contact.fullname}</div>
            <div className="chat-order-msg">{order.msgs[order.msgs.length - 1]?.txt}</div>
        </div>
    )
}