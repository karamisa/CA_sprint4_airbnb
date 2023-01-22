import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useForm } from '../customHooks/useForm.js'

import { stayService } from '../services/stay.service.local.js'
import { utilService } from '../services/util.service.js'

import arrowLeftImg from '../assets/img/arrow-left.svg'
import rareDiamond from '../assets/img/rare-diamond.svg'
import greenCheck from '../assets/img/greenCheck.svg'
import { LoginSignup } from '../cmps/login-signup'
import { BtnSquareColor } from '../cmps/ui/buttons/btn-square-color.jsx'
import { RatingReview } from '../cmps/ui/rating-review.jsx'



export function Book() {
    const navigate = useNavigate()
    const { stayId } = useParams()
    // const stayId = '622f337a75c7d36e498aaaf8'
    const [stay, setStay] = useState(null)
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    // const [fields] = useForm(getOrderFields())

    const loggedinUser = false
    let isBooked = false  //after reservation success

    console.log('stayId', stayId)
    console.log('stay', stay)
    const serviceFees = 11.2
    const fields = getOrderFields()
    console.log('fields', fields)
    // const startDate = +params.get('checkIn') || Date.now()
    // console.log('startDate', startDate)

     useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            // showErrorMsg('Cannot load toy')
            navigate('/')
        }
    }

    function getOrderFields() {
        // const buyer = {
        //     _id: 'E101',
        //     fullname: 'puki ja',
        //     imgUrl: ''
        // }
        const startDate = +params.get('checkIn') || Date.now()
        const endDate = +params.get('checkOut') || Date.now() + (1000 * 60 * 60 * 24)
        const totalDays = +utilService.totalDays(startDate, endDate)
        const guests = {
            adults: +params.get('adults') || 1,
            kids: +params.get('children') || 0,
            infants: +params.get('infants') || 0,
            pets: +params.get('pets') || 0,
        }
        // const stayToSet = {
        //     _id: stay._id,
        //     name: stay.name,
        //     price: stay.price,
        // }
        // const hostId = stay.host._id
        let totalFees
        let totalStayPrice
        let totalWithFees
        if (stay) {
            totalStayPrice = +(stay.price * utilService.totalDays(startDate, endDate)).toFixed(2)
            totalFees = +(serviceFees * utilService.totalDays(startDate, endDate)).toFixed(2)
            totalWithFees = +(totalStayPrice + (serviceFees * utilService.totalDays(startDate, endDate))).toFixed(2)
        }
        return { startDate, endDate, totalDays, totalWithFees, guests, totalFees, totalStayPrice }
    }


    function onAddOrder() {
        console.log('add order')

    }


    function onGoToTrips() {
        console.log('go to trips')
    }


    function onGoBack() {
        navigate(-1)
        // console.log('use nav to go one step back')
    }

    if (!stay) return <div>Loading...</div>
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
                                <h5 className="rare-host">{stay.host.fullname}'s place is usually booked.</h5>
                            </div>
                            <img src={rareDiamond} className="diamond-img" alt="arrowLeftImg" />
                        </div>

                        <div className="trip-details">
                            <h3 className="your-trip">Your trip</h3>
                            <div className="flex justify-between">
                                <h4 className="trip-subheader">Dates</h4>
                                <h5 className="trip-details-data">datefrom - dateto</h5>
                            </div>
                            <div className="flex justify-between">
                                <h4 className="trip-subheader">Guests</h4>
                                <h5 className="trip-details-data">getFormattedGuests</h5>
                            </div>
                        </div>
                    </div>

                    <div className="order-user">
                        {!isBooked &&
                            <>
                                {loggedinUser ? (<BtnSquareColor onClick={onAddOrder}>Confirm</BtnSquareColor>)
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
                                {loggedinUser && <BtnSquareColor onClick={onGoToTrips}>Review Trips</BtnSquareColor>}
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
                        <img className="stay-img" src={stay.imgUrls[0]} alt="stay image" />
                        <div className="stay-desc flex justify-between">
                            <div>
                                <h4 className="stay-type">{stay.type}</h4>
                                <h4 className="stay-name">{stay.name}</h4>
                            </div>

                            <div className="rating-review flex">
                                <span className="avg-rating">
                                <RatingReview reviews={stay.reviews} />
                                    </span><span>•</span><span className="reviews">({stay.reviews.length} reviews)</span>
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
                                        ${stay.price} x {fields.totalDays} nights
                                    </span>
                                    <span>$ {fields.totalStayPrice}</span>
                                </div>
                                <div className="base-cost service flex justify-between">
                                    <span className="cost-calc">Service fee</span>
                                    <span>${fields.totalFees}</span>
                                </div>
                            </div>

                            <div className="total-container">
                                <div className="cost-total flex justify-between">
                                    <span>Total</span>
                                    <span>${fields.totalWithFees}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>





            </main>



        </section>
    )
}