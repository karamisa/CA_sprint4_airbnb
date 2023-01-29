import { ChatOrderPreview } from "./chat-order-preview";

export function ChatOrderList({ orders, onSetCurrOrder, currOrder, loggedInUser }) {
    return (
        <div className="chat-order-list">
            {orders.map((order) => (
                <ChatOrderPreview
                    key={order._id}
                    order={order}
                    onSetCurrOrder={onSetCurrOrder}
                    currOrder={currOrder}
                    loggedInUser={loggedInUser}
                />
            ))}
        </div>
    )
}