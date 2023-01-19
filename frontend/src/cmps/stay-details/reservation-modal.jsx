import { useState } from 'react'
import { RatingReview } from '../util-cmps/rating-review.jsx'

export function ReservationModal({ stay, reviews }) {

    console.log('stay', stay)

    const dates = {  //temp data
        startDate: 1672686753725,
        endDate: 1673286756438
    }
    const guestsCount = 2 //temp data
    const serviceFee = 11.2

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showGuestPicker, setShowGuestPicker] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    const formattedPrice = "$" + stay.price
    const formattedStartDate = new Date(dates.startDate).toLocaleString()
    const formattedEndDate = new Date(dates.endDate).toLocaleString()
    const totalStay = Math.round(((new Date(dates.endDate)) - (new Date(dates.startDate))) / (1000 * 60 * 60 * 24))
    const totalServiceFee = "$" + (serviceFee * totalStay).toFixed(2)
    const numOfReviews = reviews.length

    const totalPrice = ((stay.price * totalStay)  +  (serviceFee * totalStay))

        function onOrderReservation(ev) {
            ev.preventDefault()
            
            setModalIsOpen(!modalIsOpen)

            console.log('reservation set!')
        }

    function openReviewModal() {
        console.log('review modal to add')
    }



    return (
        <section>Reservation
            <form onSubmit={onOrderReservation}>
                <header className="reservation-form-header">
                    <h4><span>{formattedPrice}</span> night</h4>
                    <div className="reservation-rating-review flex">
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

                <section className="reservation-details flex">

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
    <Modal>
        {/* Modal content */}
    </Modal>
)}

            
        </section>
    )

}