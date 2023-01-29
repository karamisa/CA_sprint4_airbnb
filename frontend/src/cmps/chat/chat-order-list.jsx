import { ChatOrderPreview } from "./chat-order-preview";

export function ChatOrderList({ orders, onSetCurrOrder, currOrder, loggedInUser }) {
    return (
        <div className="chat-order-list">
            {orders.map((order) => (
                <div className="border-buttom" key={order._id}>
                <ChatOrderPreview
                    order={order}
                    onSetCurrOrder={onSetCurrOrder}
                    currOrder={currOrder}
                    loggedInUser={loggedInUser}
                />
                </div>
            ))}
        </div>
    )
}