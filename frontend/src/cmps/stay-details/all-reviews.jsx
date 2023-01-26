import { ReviewsCmp } from "./reviews-cmp"

export function AllReviews({reviews}) {

const MAX_LENGTH = 50

console.log('reviews', reviews)


    return (
        <div className="all-reviews">
            <h3>Reviews</h3>
            <ReviewsCmp
                reviewsToDisplay={reviews}
                MAX_LENGTH={MAX_LENGTH}
                key={reviews.id}
              />
        </div>

    )

}