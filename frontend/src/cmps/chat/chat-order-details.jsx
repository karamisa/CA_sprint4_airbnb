import { utilService } from "../../services/util.service"

export function ChatOrderDetails({ currOrder }) {

    const checkInDate = utilService.formattedDate(currOrder.startDate)
    const checkOutDate = utilService.formattedDate(currOrder.startDate)


    return (

        <div className="msg-order-details">
            <div className="order-img flex">
                <img src={currOrder.stay.imgUrls[0]} alt="orderImg" />
            </div>
            <section className="order-header">
                <h3 className="chat-order-name">{currOrder.stay.name}</h3>
                <h3 className="chat-stay-type">{currOrder.stay.type}</h3>
            </section>
            <section className="details">
                <div className="chat-stay-guests">
                    <p><span className="details-title">Guests: </span><span>{currOrder.guests.adults} adults </span>
                        {currOrder.guests.children > 0 && <span>, {currOrder.guests.children} children</span>}
                        {currOrder.guests.infants > 0 && <span>, {currOrder.guests.infants} infants</span>}
                        {currOrder.guests.pets > 0 && <span>, {currOrder.guests.pets} pets</span>}
                    </p>
                </div>
                <div className="chat-dates">
                    <p className="chat-dates-details flex"><span className="details-title">Check in: </span><span>{checkInDate}</span></p>
                    <p className="chat-dates-details flex"><span className="details-title">Check out: </span><span>{checkOutDate}</span></p>
                </div>
                <div className="chat-stay-price flex">
                    <span className="details-title">Total price: </span><span className="details-total">${currOrder.totalPrice.toFixed(2)}</span>
                </div>
            </section>
        </div>
    )
}


