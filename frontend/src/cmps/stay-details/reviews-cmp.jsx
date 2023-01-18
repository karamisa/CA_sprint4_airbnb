import { useState } from 'react'


export function ReviewsCmp({ reviewsToDisplay }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const MAX_LENGTH = 100

    if (!reviewsToDisplay || !Array.isArray(reviewsToDisplay)) return <div>Loading...</div>

    return (
        <div className="reviews-list grid">
            {reviewsToDisplay.map((review, index) => (
                <div className="review-prev flex" key={index}>
                    <div className="mini-user-details grid">
                        <img src={review.by.imgUrl} alt={review.by.fullname} className="mini-user-img" />
                        <p className="review-fullname">{review.by.fullname}</p>
                        <span>Jan 2023</span>
                        {/* <span className="review-createdAt">{reviewsToDisplay.createdAt}</span> */}
                    </div>
                    <p>{isExpanded ? review.txt : review.txt.substring(0, MAX_LENGTH)}</p>
                    <button className="show-more" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                </div>
            ))
            }
        </div >
    )
}
