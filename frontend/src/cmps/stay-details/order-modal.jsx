import { useState } from 'react'
import { orderService } from '../../services/order.service.js'
import { utilService } from '../../services/util.service.js'
import { RatingReview } from '../util-cmps/rating-review.jsx'

export function OrderModal({ stay, reviews }) {

    console.log('stay', stay)

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

    const formattedPrice = "$" + stay.price
    const formattedStartDate = new Date(dates.startDate).toLocaleString()
    const formattedEndDate = new Date(dates.endDate).toLocaleString()
    // const totalStay = Math.round(((new Date(dates.endDate)) - (new Date(dates.startDate))) / (1000 * 60 * 60 * 24))
    const totalStay = utilService.totalDays(dates.startDate, dates.endDate)
    const totalServiceFee = "$" + (serviceFee * totalStay).toFixed(2)
    const numOfReviews = reviews.length
    const isLogged = true
    const totalPrice = ((stay.price * totalStay) + (serviceFee * totalStay))
    const guestsCount = guests.adults + guests.kids



      function handleAddOrder() {
       const order = orderService.getEmptyOrder()
        const newOrder = {
          ...order,
          buyer: {
            _id:  'E101',
            fullname:  'puki ja',
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

        newOrder.totalPrice = totalPrice
        newOrder.startDate = dates.startDate
        newOrder.endDate = dates.endDate



        setModalIsOpen(!modalIsOpen)
        // addOrder(newOrder)
      } 



    function onOrderSubmit(ev) {
        ev.preventDefault()
     
        if (!isLogged) return

        

        setModalIsOpen(!modalIsOpen)

        console.log('reservation set!')
    }

    function openReviewModal() {
        console.log('review modal to add')
    }



    return (
        <section className="order-modal">
            <form className="order-modal-form flex" onSubmit={onOrderSubmit}>
                <header className="order-form-header">
                    <h4><span>{formattedPrice}</span> night</h4>
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
                            <img src="../../assets/img/arrow-down.svg" className="arrow-img" />
                        ) : (
                            <img src="../../assets/img/arrow-up.svg" className="arrow-img" />
                        )}
                        {/* <GuestsModal
                            onSetGuests={setGuests}
                            className={`${showGuestPicker ? 'open' : ''}`}
                        /> */}
                    </div>
                </section>

                <button className="btn-reserve">
                    Reserve
                </button>

                <section className="order-details flex">

                    {dates.startDate && dates.endDate && (
                        <>
                            <p style={{ textAlign: 'center' }}>You won't be charged yet</p>
                            <div className="prices">
                                <p>{formattedPrice} x {totalStay} nights</p>
                                <p>{stay.price * totalStay}</p>
                                <p>Service fee</p>
                                <p>{totalServiceFee}</p>
                            </div>
                            <div className="total">
                                <p>Total</p>
                                <p>{totalPrice}</p>
                            </div>
                        </>
                    )}

                </section>




            </form>

            {modalIsOpen && (
                <div className="order-confirmation-modal">
                    <p>Your reservation was accepted!</p>
                    <div>number of guests: <span>{guestsCount}</span></div>
                    <div>dates: <span>{formattedStartDate}</span>-<span>{formattedStartDate}</span></div>
                    <div>total Price: <span>{totalPrice}</span></div>


                </div>
            )}


        </section>
    )

}