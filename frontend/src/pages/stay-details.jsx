export function StayDetails() {
    return (
        <section className="main-layout secondary-layout">
            <h1>Stay Details</h1>
            <section className="stay-details">
                <h1 className="title">{stay.name}</h1>
                <div class="flex justify-between">
                    <div class="name-subtitle flex">
                        <div className="stay-avg-rating">⭐{avgRating}</div>   || <RatingReview review={stay.reviews} />
                        <span>•</span>
                        <div className="stay-rating" onClick={openReviewModal}>{stay.reviews.length} reviews</div>
                        <span>•</span>
                        <div className="stay-location" onClick={openReviewMap}>{stay.loc.address}</div>
                    </div>
                    <button className="save-stay active" onClick={onSaveStay}>❤ Save</button>
                </div>

                <div className="images-container stay-imgs grid" onClick={onOpenStayGallery}>
                    {imgsToDisplay.map((img, index) => (
                        <img key={index} src={img} />
                    ))}
                </div>

                <section className="stay-review-mid grid border-buttom">
                    <div className="stay-review-details">
                        <div className="about-host border-buttom">

                        </div>
                        <div className="stay-highlights border-buttom">
                            can be hardcoaded
                        </div>
                        <div className="stay-summery border-buttom">
                            {stay.summary}
                        </div>
                        <div className="stay-amenities border-buttom">
                            <h4 className="subheading">What this place offers</h4>
                            <ul className="amenities-container grid">
                                {filteredAmenities.map((amenity, index) => (
                                    <li key={index}>
                                        <StayAmenity amenity={amenity} limit={10} />
                                    </li>
                                ))}
                            </ul>
                            {(stay.amenities.length > 10) && <button className="rev-btn show-all-amenities" onClick={onToggleAmenities}>show all {stay.amenities.length} amenities </button>}
                        </div>
                        <div className="stay-calendar">

                        </div>

                    </div>

                    <div className="stay-review-reservation">

                    </div>

                </section>

                <div className="reviews border-buttom">
                    <h2 className="stay-mid-reviews"><RatingReview review={stay.reviews} /></h2>
                    <div className="stay-mid-reviews-container">
                        <ReviewCmp reviews={stay.reviews} limit={6} onOpenAllReviewsModal={openAllReviewsModal} />
                    </div>
                    {(stay.reviews.length > 6) && <button className="rev-btn show-all-reviews" onClick={onToggleReviews}>show all {stay.reviews.length} reviews </button>}
                </div>

                <div className="stay-map border-buttom">


                </div>

                <div className="stay-about-host border-buttom">


                    <button className="rev-btn contact host"></button>
                </div>




            </section>
        </section>
    )
}