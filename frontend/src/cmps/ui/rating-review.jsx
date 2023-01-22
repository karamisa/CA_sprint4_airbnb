import { FaStar } from 'react-icons/fa'

import { Fragment } from 'react'


export function RatingReview({ reviews }) {

    function calcAvgReview(reviews) {
        let total = 0
        let count = 0

        reviews.forEach(review => {
            total += Object.values(review.rate).reduce((a, b) => a + b)
            count += Object.keys(review.rate).length
        })
        return (
            +(total / count).toFixed(2)
        )
    }

    let avgRating = calcAvgReview(reviews)

    return (
        <Fragment>
            <span className="avg-rating">
                <FaStar />
                {avgRating}
            </span>


        </Fragment>
    )

}
