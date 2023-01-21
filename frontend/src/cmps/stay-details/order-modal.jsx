
import { useLocation } from 'react-router-dom'

import { useState } from 'react'
import { orderService } from '../../services/order.service.js'
import { utilService } from '../../services/util.service.js'
import { RatingReview } from '../util-cmps/rating-review.jsx'
import { OrderDetails } from './order-details.jsx'
import { DateSelect } from "./../date-select.jsx"
import { GuestSelect } from "./../guest-select.jsx"

import arrowDownImg from '../../assets/img/arrow-down.svg'
import arrowUpImg from '../../assets/img/arrow-up.svg'

export function OrderModal({ stay, reviews }) {

    // console.log('stay', stay)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
   
    const dates = {
        startDate: +params.get('checkIn') || null,
        endDate: +params.get('checkOut') || null
    }

    const guests = {}
    for (const [key, value] of params.entries()) {
      if (key.startsWith('guests[')) {
        guests[key.split('[')[1].split(']')[0] === 'children' ? 'kids' : key.split('[')[1].split(']')[0]] = parseInt(value, 10)
      }
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
                    <section className="date-picker-modal">
                        {showDatePicker && <DateSelect
                            checkIn={dates.startDate}
                            checkOut={dates.endDate}
                            className="date-picker"
                        />}
                        {/* <DatePicker
                           onChange={setDates}
                           value={dates}
                          /> */}
                    </section>
                    <section className="dates-selection flex">

                        <div onClick={() => setShowDatePicker(true)} className="check-in picker">
                            <label htmlFor="check-in">CHECK-IN</label>
                            <input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={formattedStartDate}
                            />
                        </div>

                        <div onClick={() => setShowDatePicker(true)} className="check-out picker">
                            <label htmlFor="check-out">CHECK-OUT</label>
                            <input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={formattedEndDate}
                            />
                        </div>
                    </section>

                    <div
                        onClick={() => setShowGuestPicker(!showGuestPicker)}
                        className="guest-picker"
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
                        {showGuestPicker && <GuestSelect guests={guests} />}
                    </div>
                </section>

                <button className="akebnb-btn btn-reserve">
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