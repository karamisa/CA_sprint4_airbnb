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
    const CheckOutdate = utilService.ShortFormattedDate(orderParams.checkOut)

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

    // function getGuestsSubHeading() {
    //     var guestSubheading = ''
    //     const { adults, children, infants, pets } = orderParams.guests
    //     if (adults) guestSubheading += `${adults} adults`
    //     if (children) guestSubheading += `, ${children} children`
    //     if (infants) guestSubheading += `, ${infants} infants`
    //     if (pets) guestSubheading += `, ${pets} pets`
    //     if (guestSubheading.includes('1 adults' || '1 children' || '1 infants' || '1 pets')) {
    //         guestSubheading = guestSubheading.replace('1 adults', '1 adult')
    //         guestSubheading = guestSubheading.replace('1 children', '1 child')
    //         guestSubheading = guestSubheading.replace('1 infants', '1 infant')
    //         guestSubheading = guestSubheading.replace('1 pets', '1 pet')
    //     }
    //     if (!guestSubheading) guestSubheading = 'Add Guests'
    //     if (guestSubheading === '1 adult') guestSubheading = '1 guest'
    //     return guestSubheading
    // }

    function getGuestCount() {
        const { adults, children } = orderParams.guests
        const totalGuests = adults + children
        if(totalGuests === 1) return '1 guest'
        return (totalGuests + ' guests')
    }

    return (
        <>
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
            <div className='footer-guest-view'>{getGuestCount()}</div>
        </>
    )
}