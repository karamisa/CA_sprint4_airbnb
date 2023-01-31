import { utilService } from "../../services/util.service"
import { BtnSquare } from "../ui/buttons/btn-square"

export function ChatOrderDetails({ currOrder }) {

    const checkInDate = utilService.formattedDate(currOrder.startDate)
    const checkOutDate = utilService.formattedDate(currOrder.startDate)


    const { stay, guests, } = currOrder

    return (
        <>
            <div className="order-summary-card">
                <div className="order-card-header">
                    <img src={stay.imgUrls[0]} alt={stay.name} className="order-card-header-img" />
                </div>
                <div className="order-card-body">

                    <div className="order-card-header-text">
                        <h3 className="order-card-header-title">{stay.name}</h3>
                        <p className="order-card-header-subtitle">Hosted by {stay.host.fullname}</p>
                    </div>
                    <div className="order-card-body-row" >
                        <div className="order-card-body-col">
                            <p className="order-card-body-row-title">Check-in:</p>
                            <p className="order-card-body-row-value">{checkInDate}</p>
                        </div>
                        <div className="order-card-body-col">
                            <p className="order-card-body-row-title">Check-out:</p>
                            <p className="order-card-body-row-value">{checkOutDate}</p>
                        </div>
                    </div>
                    <div className="order-card-body-row">
                        <p className="order-card-body-row-title">Guests:</p>
                        <p className="order-card-body-row-value">
                            {guests.adults} adults
                            {guests.children > 0 &&
                                <span className="order-card-body-row-value">,{guests.children} children</span>
                            }
                            {guests.infants > 0 &&
                                <span className="order-card-body-row-value">,{guests.infants} infants</span>
                            }
                            {guests.pets > 0 &&
                                <span className="order-card-body-row-value">,{guests.pets} pets
                                </span>

                            }
                        </p>
                    </div>
                    <div className="order-card-body-row price-row">
                        <p className="order-card-body-row-title">Total price:</p>
                        <p className="order-card-body-row-value total-price">${currOrder.totalPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className="order-summary-actions">
                <BtnSquare>
                    Edit Order
                </BtnSquare>
            </div>
        </>

    )
}

