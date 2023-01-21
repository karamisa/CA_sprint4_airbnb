import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { stayService } from '../services/stay.service.local.js'
import { RatingReview } from '../cmps/util-cmps/rating-review.jsx'
import { ImgGrid } from '../cmps/util-cmps/img-grid.jsx'
import { AmenitiesList } from '../cmps/stay-details/amenities-list.jsx'
import { ReviewsCmp } from '../cmps/stay-details/reviews-cmp.jsx'
import { ReviewBar } from '../cmps/stay-details/review-bar.jsx'
import { OrderModal } from '../cmps/stay-details/order-modal.jsx'



export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    // const stayId = '622f337a75c7d36e498aaaf8'
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [])

    const imgsToDisplay = stay?.imgUrls?.slice(0, 5)
    const amenitiesToDisplay = stay?.amenities?.slice(0, 10)
    const reviewsToDisplay = stay?.reviews?.slice(0, 6)

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            // showErrorMsg('Cannot load toy')
            navigate('/stay')
        }
    }

    function openReviewModal() {

    }

    function openReviewMap() {

    }

    function onSaveStay() {

    }

    function onOpenStayGallery() {
        console.log('open gallery')
    }


    function onToggleAmenities() {

    }


    function onToggleReviews() {

    }

    function openAllReviewsModal() {

    }


    if (!stay) return <div>Loading...</div>
    return (
        <section className="main-layout secondary-layout">
            <h1>Stay Details</h1>
            <section className="stay-details">
                <h1 className="title">{stay.name}</h1>
                <div className="flex justify-between">
                    <div className="name-subtitle flex">
                        <RatingReview reviews={stay.reviews} />
                        <span>•</span>
                        <div className="stay-rating" onClick={openReviewModal}>{stay.reviews.length} reviews</div>
                        <span>•</span>
                        <div className="stay-location" onClick={openReviewMap}>{stay.loc.address}</div>
                    </div>
                    <button className="save-stay active" onClick={onSaveStay}>❤ Save</button>
                </div>

                <ImgGrid imgsToDisplay={imgsToDisplay} onOpenStayGallery={onOpenStayGallery} />

                <section className="stay-review-mid grid border-buttom">
                    <div className="stay-review-details">
                        <div className="about-host border-buttom">

                        </div>
                        <div className="stay-highlights border-buttom">
                            can be hardcoaded
                        </div>
                        <div className="air-cover border-buttom">
                            <h3>
                                <span>air</span>cover
                            </h3>
                            <p>
                                Every booking includes free protection from Host
                                cancellations, listing inaccuracies, and other issues
                                like trouble checking in.
                            </p>

                        </div>
                        <div className="stay-summery border-buttom">
                            {stay.summary}
                        </div>
                        <div className="stay-amenities">
                            <h4 className="subheading">What this place offers</h4>
                            {amenitiesToDisplay && <AmenitiesList amenitiesToDisplay={amenitiesToDisplay} />}
                            {(stay.amenities.length > 10) && <button className="rev-btn show-all-amenities" onClick={onToggleAmenities}>show all {stay.amenities.length} amenities </button>}
                        </div>
                        <div className="stay-calendar">

                        </div>

                    </div>

                    <div className="stay-review-order">
                        <OrderModal stay={stay} reviews={stay.reviews} />
                    </div>

                </section>

                <div className="reviews border-buttom">
                    <h2 className="stay-mid-reviews"><RatingReview reviews={stay.reviews} /> • {stay.reviews.length} reviews</h2>
                    <div className="stay-mid-reviews-container">
                        <ReviewBar reviews={stay.reviews} />
                        <ReviewsCmp reviewsToDisplay={reviewsToDisplay} key={reviewsToDisplay.id} />
                    </div>
                    {(stay.reviews.length > 6) && <button className="rev-btn show-all-reviews" onClick={onToggleReviews}>show all {stay.reviews.length} reviews </button>}
                </div>

                <div className="stay-map border-buttom">
                    Where you'll be
                </div>

                <div className="stay-about-host border-buttom">


                    <button className="rev-btn contact host">contact host</button>
                </div>




            </section>
        </section>
    )
}