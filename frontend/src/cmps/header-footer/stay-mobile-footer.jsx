import { useNavigate, useSearchParams } from "react-router-dom";
import { utilService } from "../../services/util.service";
import { BtnSquareColor } from "../ui/buttons/btn-square-color";
import { RatingReview } from "../ui/rating-review";

export function StayMobileFooter({ stay, setOpenTab }) {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const orderParams = {
        checkIn: searchParams.get('checkIn')
            ? new Date(+searchParams.get('checkIn'))
            : '',
        checkOut: searchParams.get('checkOut')
            ? new Date(+searchParams.get('checkOut'))
            : '',
        guests: {
            adults: +searchParams.get('adults') || 1,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        },
    }

    const CheckIndate = utilService.ShortFormattedDate(orderParams.checkIn)
    const CheckOutdate = utilService.ShortFormattedDate(orderParams.checkIn)

    function onClickReserve() {
        const paramsToSet = utilService.objectToSearchParams({
            checkIn: orderParams.checkIn.getTime(),
            checkOut: orderParams.checkOut.getTime(),
            adults: orderParams.guests.adults,
            children: orderParams.guests.children,
            infants: orderParams.guests.infants,
            pets: orderParams.guests.pets,
        })
        navigate(`/book/stay/${stay._id}?${paramsToSet}`)
    }
    return (
        <div className={'stay-mobile-footer flex'} >
            <div className='book-it-details'>
                <h4><span className="price">${(Math.round(stay.price)).toLocaleString()}</span> night</h4>

                {(!orderParams.checkIn || !orderParams.checkOut) && (
                    <div className='order-rating-review flex'>
                        <RatingReview reviews={stay.reviews} />
                    </div>
                )}
                {(orderParams.checkIn || orderParams.checkOut) && (
                    <div className='order-rating-review flex'>
                        <span>{CheckIndate}</span><span>-</span><span>{CheckOutdate}</span>
                    </div>
                )}
            </div>

            {orderParams.checkIn && orderParams.checkOut && (
                <div className="footer-btn">
                    <BtnSquareColor onClick={onClickReserve} children={'Reserve'} />
                </div>
            )}

            {(!orderParams.checkIn || !orderParams.checkOut) && (
                <div className="footer-btn">
                    <BtnSquareColor
                        onClick={() => {
                            setOpenTab('checkIn')

                        }}
                        children={<a href="#stay-mid" className="footer-btn-link">Check availability</a>}
                    />
                </div>
            )}

        </div>
    )
}