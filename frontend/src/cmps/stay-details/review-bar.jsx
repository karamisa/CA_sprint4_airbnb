
export function ReviewBar({ reviews }) {

    const avgReviews = {
        cleanliness: 0,
        communication: 0,
        checkIn: 0,
        accuracy: 0,
        location: 0,
        value: 0
    }
    let count = 0

    reviews.forEach(review => {
        avgReviews.cleanliness += review.rate.cleanliness
        avgReviews.communication += review.rate.communication
        avgReviews.checkIn += review.rate['check-in']
        avgReviews.accuracy += review.rate.accuracy
        avgReviews.location += review.rate.location
        avgReviews.value += review.rate.value
        count++
    })

    Object.keys(avgReviews).forEach((key) => {
        avgReviews[key] = +(avgReviews[key] / count).toFixed(2)
    })

    return (
        <section className="reviews-bar grid">
            <p>Cleanliness</p>
            <span className="progress-bar flex flex">
                <progress value={avgReviews.cleanliness} max="5" />
                {avgReviews.cleanliness.toFixed(1)}
            </span>
            <p>Communication</p>
            <span className="progress-bar flex">
                <progress value={avgReviews.communication} max="5" />
                {avgReviews.communication.toFixed(1)}
            </span>
            <p>Check-in</p>
            <span className="progress-bar flex">
                <progress value={avgReviews.checkIn} max="5" />
                {avgReviews.checkIn.toFixed(1)}
            </span>
            <p>Accuracy</p>
            <span className="progress-bar flex">
                <progress value={avgReviews.accuracy} max="5" />
                {avgReviews.accuracy.toFixed(1)}
            </span>
            <p>Location</p>
            <span className="progress-bar flex">
                <progress value={avgReviews.location} max="5" />
                {avgReviews.location.toFixed(1)}
            </span>
            <p>Value</p>
            <span className="progress-bar flex">
                <progress value={avgReviews.value} max="5" />
                {avgReviews.value.toFixed(1)}
            </span>
        </section>
    )
}