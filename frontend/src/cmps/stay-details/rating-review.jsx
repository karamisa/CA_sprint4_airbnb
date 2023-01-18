import { FaStar } from 'react-icons/fa'

import { Fragment } from 'react'


export function RatingReview({reviews}) {

    function calcAvgReview(reviews){
        return (
            +(reviews.reduce((acc, currRev) => acc + currRev.rate, 0) / reviews.length).toFixed(2)
        )

    }

    let avgRating = calcAvgReview(reviews)

    return (
        <Fragment>
            <span>
                <FaStar />
                {avgRating}
            </span>
            <span>•</span>

        </Fragment>
    )





}