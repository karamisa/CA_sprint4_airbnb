import { FaStar } from 'react-icons/fa'

import { Fragment, useEffect, useState } from 'react'


export function RatingReview({reviews}) {

    // console.log('reviews', reviews)

    // const [avgRating, setAvgRating] = useState(0)
    // const [reviewCount, setReviewCount] = useState(0)


    // useEffect(() => {
    //     if (reviews && Array.isArray(reviews)) {
    //         setReviewCount(reviews.length)
            // setAvgRating(+(reviews.reduce((acc, currRev) => acc + currRev.rate, 0) / reviewCount).toFixed(2))
    //     }
        
    // }, [reviews])

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