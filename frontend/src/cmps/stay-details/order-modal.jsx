import { useState } from 'react'
import { orderService } from '../../services/order.service.js'
import { utilService } from '../../services/util.service.js'
import { RatingReview } from '../util-cmps/rating-review.jsx'
import { OrderDetails } from './order-details.jsx'
import { DateSelect } from "./../date-select.jsx";

import arrowDownImg from '../../assets/img/arrow-down.svg'
import arrowUpImg from '../../assets/img/arrow-up.svg'

export function OrderModal({ stay, reviews }) {

    // console.log('stay', stay)

    const dates = {  //temp data
        startDate: 1672686753725,
        endDate: 1673286756438
    }

    const guests = {  //temp data
        adults: 2,
        kids: 0,
        infants: 0,
        pets: 0,
    }


    const serviceFee = 11.2

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showGuestPicker, setShowGuestPicker] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const stayPrice = Math.round(stay.price)
    const formattedStartDate = utilService.formattedDate(dates.startDate)
    const formattedEndDate = utilService.formattedDate(dates.endDate)
    const totalStay = utilService.totalDays(dates.startDate, dates.endDate)
    const totalStayPrice = Math.round(stay.price * totalStay)
    const totalServiceFee = Math.round((serviceFee * totalStay))
    const numOfReviews = reviews.length
    const isLogged = true
    const totalPrice = Math.round(totalStayPrice + totalServiceFee)
    const guestsCount = guests.adults + guests.kids

    const orderPrices = { stayPrice, totalStay, totalStayPrice, totalServiceFee, totalPrice }


    function setOrder() {
        const order = orderService.getEmptyOrder()
        const newOrder = {
            ...order,
            buyer: {
                _id: 'E101',
                fullname: 'puki ja',
                imgUrl: ''
            },
            //   buyer: {
            //     _id: loggedinUser._id,
            //     fullname: loggedinUser.fullname,
            //     imgUrl: loggedinUser.imgUrl,
            //   },
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,
                imgUrls: stay.imgUrls.slice(0, 3),
                loc: {
                    address: stay.loc.address,
                },
            },
            hostId: stay.host._id,
        }

        newOrder.totalPrice = (stay.price * totalStay) + (serviceFee * totalStay)
        newOrder.startDate = dates.startDate
        newOrder.endDate = dates.endDate

        console.log('newOrder', newOrder)
        // addOrder(newOrder)
    }



    function onOrderSubmit(ev) {
        ev.preventDefault()
        if (!modalIsOpen) setOrder()
        //go to form page
        if (!isLogged) return

        setModalIsOpen(!modalIsOpen)
        if (modalIsOpen) console.log('reservation set!')
    }

    function openReviewModal() {
        console.log('review modal to add')
    }


    // const onOrderSubmit = async (values) => {
    //     try{
    //        values.labels = [values.type]
    //       await saveOrder(values, goBack)
    //     } catch(err){
    //       console.log('Cannot save order: ', err)
    //     }
    //   }

    //   const goBack = () => {
    //     navigate('/stay/:id')
    //   }


    return (
        <section className="order-modal">
            <form className="order-modal-form flex" onSubmit={onOrderSubmit}>
                <header className="order-form-header flex">
                    <h4><span>${stayPrice}</span> night</h4>
                    <div className="order-rating-review flex">
                        <RatingReview reviews={stay.reviews} />
                        <span>•</span>
                        <div className="stay-rating" onClick={openReviewModal}>{numOfReviews} reviews</div>
                    </div>
                </header>

                <section className="picker-container">
                    <div onClick={() => setShowDatePicker(true)} className="check-in picker">
                        <label htmlFor="check-in">CHECK-IN</label>
                        <input
                            type="text"
                            placeholder="MM/DD/YYYY"
                            value={formattedStartDate}
                        />
                    </div>
                    <section className="date-picker-container">
                    <DateSelect />
                        {/* <DatePicker
                            onChange={setDates}
                            value={dates}
                            className="date-picker-reserve"
                            startPlaceholder="Start date"
                            endPlaceholder="End date"
                        /> */}
                    </section>
                    <div onClick={() => setShowDatePicker(true)} className="check-out picker">
                        <label htmlFor="check-out">CHECK-OUT</label>
                        <input
                            type="text"
                            placeholder="MM/DD/YYYY"
                            value={formattedEndDate}
                        />
                    </div>
                    <div
                        onClick={() => setShowGuestPicker(!showGuestPicker)}
                        className="guests picker"
                    >
                        <label htmlFor="guests">GUESTS</label>
                        <input
                            type="text"
                            value={guestsCount}
                            style={{ color: 'black', backgroundColor: 'white' }}
                            disabled
                        />
                        {!showGuestPicker ? (
                            <img src={arrowDownImg} className="arrow-img" alt="arrowDownImg" />
                        ) : (
                            <img src={arrowUpImg} className="arrow-img" alt="arrowUpImg" />
                        )}
                        {/* <GuestsModal
                            onSetGuests={setGuests}
                            className={`${showGuestPicker ? 'open' : ''}`}
                        /> */}
                    </div>
                </section>

                <button className="btn-reserve">
                    {!totalStay ? (<>Check availability</>) : (<>Reserve</>)}
                </button>

                <section className="order-details flex">
                    {dates.startDate && dates.endDate && (
                        <OrderDetails orderPrices={orderPrices} />
                    )}
                </section>
            </form>

            {modalIsOpen && (
                <div className="order-confirmation-modal">
                    <p>Your reservation was accepted!</p>
                    <div>number of guests: <span>{guestsCount}</span></div>
                    <div>dates: <span>{formattedStartDate}</span>-<span>{formattedEndDate}</span></div>
                    <div>total Price: <span>${totalPrice}</span></div>


                </div>
            )}


        </section>
    )

}