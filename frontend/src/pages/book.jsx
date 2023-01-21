import arrowLeftImg from '../assets/img/arrow-left.svg'
import rareDiamond from '../assets/img/rare-diamond.svg'
import greenCheck from '../assets/img/greenCheck.svg'
import { LoginSignup } from '../cmps/login-signup'

export function Book() {


    const loggedinUser = true
    const isBooked = false  //after reservation success


    function onAddOrder() {
        console.log('add order')
    }


    function onGoToTrips() {
        console.log('go to trips')
    }


    function onGoBack() {
        console.log('use nav to go one step back')
    }

    return (
        <section className="main-layout secondary-layout">

            <header className="booking-title flex">
                <div className="icon-svg">
                    <img src={arrowLeftImg} className="arrow-img" alt="arrowLeftImg" onClick={onGoBack} />
                </div>
                <div>
                    {!isBooked &&
                        <h2>Request to book</h2>
                    }
                    {isBooked &&
                        <div className="success-title flex">
                            <img src={greenCheck} className="icon-svg greenCheck-img" alt="greenCheckImg" />
                            <h2>Reservation success!</h2>
                        </div>}
                </div>
            </header>



            <main className="order-content flex justify-between">

                <section className="order-details flex justify-between">
                    <div className="border-buttom">
                        <div className="rare-find flex justify-between">
                            <div>
                                <h4>This is a rare find</h4>
                                <h5 className="rare-host">STAY.HOST.NAME's place is usually booked.</h5>
                            </div>
                            <img src={rareDiamond} className="diamond-img" alt="arrowLeftImg" />
                        </div>

                        <div className="trip-details">
                            <h3 className="your-trip">Your trip</h3>
                            <div className="flex justify-between">
                                <h4 className="trip-subheader">Dates</h4>
                                <h5 className="trip-details-data">datefrom - dateto</h5>
                            </div>
                            <div class="flex justify-between">
                                <h4 className="trip-subheader">Guests</h4>
                                <h5 className="trip-details-data">getFormattedGuests</h5>
                            </div>
                        </div>
                    </div>

                    <div className="order-user">
                        {!isBooked &&
                            <>
                                {loggedinUser ? (<button onClick={onAddOrder}>Confirm</button>)
                                    : (<div>
                                        <h3 className="login-msg">Please login to book</h3>
                                        <span>login component</span>
                                        <LoginSignup />
                                    </div>)}
                            </>
                        }
                        {isBooked &&
                            <>
                                <h3 className="success-msg">We look forward to hosting you!</h3>
                                {loggedinUser && <button onClick={onGoToTrips}>Review Trips</button>}
                                <div className="success-txt flex">
                                    <div className="icon-svg">
                                        <img src={greenCheck} className="greenCheck-img" alt="greenCheckImg" />
                                    </div>
                                    <h4 className="res-success-txt">Reservation success!</h4>
                                </div>
                            </>
                        }
                    </div>




                </section>



                <section className="summary-card">

                    <div className="stay-details flex border-buttom">
                        <img className="stay-img" src="stay.imgUrls[0]" alt="stay image" />
                        <div className="stay-desc flex justify-between">
                            <div>
                                <h4 className="stay-type">stay.type</h4>
                                <h4 className="stay-name">stay.name </h4>
                            </div>

                            <div className="rating-review flex">
                                <span className="avg-rating">⭐rating</span><span>•</span><span className="reviews"># reviews</span>
                                {/* <RatingReview reviews={stay.reviews} /> */}
                            </div>
                        </div>
                    </div>

                    <div className="price-details">
                        <h3 className="price-details-header">Price details</h3>
                        <div className="cost-breakdown flex">
                            <div className="cost-details flex border-buttom">
                                <div className="base-cost flex justify-between">
                                    <span className="cost-calc">
                                        stay.price x nights
                                    </span>
                                    <span>
                                        total.stay.price
                                    </span>
                                </div>
                                <div className="base-cost service flex justify-between">
                                    <span className="cost-calc">Service fee</span>
                                    <span>
                                        total.service.Fee
                                    </span>
                                </div>
                            </div>

                            <div className="total-container">
                                <div className="cost-total flex justify-between">
                                    <span>Total</span>
                                    <span>totalPrice</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>





            </main>



        </section>
    )
}