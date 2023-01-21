
import { useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { orderService } from '../../services/order.service.js'
import { utilService } from '../../services/util.service.js'
import { RatingReview } from '../util-cmps/rating-review.jsx'
import { OrderDetails } from './order-details.jsx'
import { DateSelect } from "./../date-select.jsx"
import { GuestSelect } from "./../guest-select.jsx"

import arrowDownImg from '../../assets/img/arrow-down.svg'
import arrowUpImg from '../../assets/img/arrow-up.svg'
import { useForm } from '../../customHooks/useForm.js'

export function OrderModal({ stay, reviews }) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showGuestPicker, setShowGuestPicker] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [fields, setFields, handleChange] = useForm(getOrderFields())


    function onSetField(field, value) {
        console.log('field', field)
        if (field === 'checkIn') setFields((prevFields) => ({ ...prevFields, startDate: value }))
        if (field === 'checkOut') setFields((prevFields) => ({ ...prevFields, endDate: value }))
        if (field === 'guests') setFields((prevFields) => ({ ...prevFields, guests: { ...value, kids: prevFields.guests.children } }))
        else setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    function getOrderFields() {
        const buyer = {
            _id: 'E101',
            fullname: 'puki ja',
            imgUrl: ''
        }
        const startDate = +params.get('checkIn') || null
        const endDate = +params.get('checkOut') || null
        const guests = {
            adults: +params.get('adults') || 1,
            kids: +params.get('children') || 0,
            infants: +params.get('infants') || 0,
            pets: +params.get('pets') || 0,
        }
        const stayToSet = {
            _id: stay._id,
            name: stay.name,
            price: stay.price,
        }
        const hostId = stay.host._id
        const totalPrice = Math.round(stay.price * utilService.totalDays(startDate, endDate))
        return { buyer, startDate, endDate, guests, stay: stayToSet, hostId, totalPrice }
    }

console.log(fields)
    const formatteDetails = {
        startDate: utilService.formattedDate(fields.startDate),
        endDate: utilService.formattedDate(fields.endDate),
        totalStay: utilService.totalDays(fields.startDate, fields.endDate),
        totalStayPrice: fields.totalPrice,
        totalServiceFee: Math.round(((11.2) * utilService.totalDays(fields.startDate, fields.endDate))),
        stayPrice: Math.round(stay.price),
        numOfReviews: reviews.length,
        guestsCount: fields.guests.adults + fields.guests.kids,
    }

    function onOrderSubmit(ev) {
        ev.preventDefault()
        // if (!modalIsOpen) setOrder()
        //go to form page
        // if (!isLogged) return
        setModalIsOpen(!modalIsOpen)
        //Temp until order page is ready
        orderService.save(fields)
        if (modalIsOpen) console.log('reservation set!')
    }

    function openReviewModal() {
        console.log('review modal to add')
    }
    return (
        <section className="order-modal">
            <form className="order-modal-form flex" onSubmit={onOrderSubmit}>

                <header className="order-form-header flex">
                    <h4><span>${formatteDetails.totalStayPrice}</span> night</h4>
                    <div className="order-rating-review flex">
                        <RatingReview reviews={stay.reviews} />
                        <span>•</span>
                        <div className="stay-rating" onClick={openReviewModal}>
                            {formatteDetails.numOfReviews} reviews
                        </div>
                    </div>
                </header>

                <section className="picker-container">
                    <section className="date-picker-modal">
                        {showDatePicker && <DateSelect
                            checkIn={fields.startDate}
                            checkOut={fields.endDate}
                            onSetField={onSetField}
                            className="date-picker"
                        />}
                    </section>
                    <section className="dates-selection flex">

                        <div onClick={() => setShowDatePicker(true)} className="check-in picker">
                            <div className='checkin-heading' >Check-In</div>
                            <div className='checkin-sub-heading'>{(fields.startDate) ? formatteDetails.startDate : 'Add Date'}</div>
                            {/* <label htmlFor="check-in">CHECK-IN</label>
                            <input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={formatteDetails.startDate}
                            /> */}
                        </div>

                        <div onClick={() => setShowDatePicker(true)} className="check-out picker">
                            <div className='checkout-heading'>Check-Out</div>
                            <div className='checkout-sub-heading'>{(fields.endDate) ? formatteDetails.endDate : 'Add Date'}</div>
                            {/* <label htmlFor="check-out">CHECK-OUT</label>
                            <input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={formatteDetails.endDate}
                            /> */}
                        </div>
                    </section>

                    <div className="guest-picker" onClick={() => setShowGuestPicker(!showGuestPicker)}>
                        <div className="guests-heading">Guests</div>
                        <div className="guests-sub-heading">{formatteDetails.guestsCount}</div>
                        {/* <label htmlFor="guests" onClick={() => setShowGuestPicker(!showGuestPicker)}>GUESTS</label>
                        <input
                            type="text"
                            value={formatteDetails.guestsCount}
                            style={{ color: 'black', backgroundColor: 'white' }}
                            disabled
                        /> */}
                        {!showGuestPicker ? (
                            <img src={arrowDownImg} className="arrow-img" alt="arrowDownImg" />
                        ) : (
                            <img src={arrowUpImg} className="arrow-img" alt="arrowUpImg" />
                        )}
                        {showGuestPicker && <GuestSelect guests={fields.guests} onSetField={onSetField} />}
                    </div>
                </section>

                <button className="akebnb-btn btn-reserve">
                    {!formatteDetails.totalStay ? (<>Check availability</>) : (<>Reserve</>)}
                </button>

                <section className="order-details flex">
                    {fields.startDate && fields.endDate && (
                        <OrderDetails orderPrices={formatteDetails} />
                    )}
                </section>
            </form>

            {modalIsOpen && (
                <div className="order-confirmation-modal">
                    <p>Your reservation was accepted!</p>
                    <div>number of guests: <span>{formatteDetails.guestsCount}</span></div>
                    <div>dates: <span>{formatteDetails.startDate}</span>-<span>{formatteDetails.endDate}</span></div>
                    <div>total Price: <span>${formatteDetails.totalStayPrice + formatteDetails.totalServiceFee}</span></div>
                </div>
            )}
        </section>
    )

}