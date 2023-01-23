import rateTag from '../../assets/img/rate-tag.svg'

export function LowerRate() {
    return (
        <section className="lower-rate-container">
            <div className="lower-rate flex">
                <div className="lower-rate-txt">
                    <span className="lower-price-txt">
                        Lower price.
                    </span>
                    <span>
                        Your dates are ₪930 less than the avg. nightly rate of the last 60 days.
                    </span>
                </div>
                <div className="rate-img-container">
                    <img src={rateTag} className="rate-tag-img" alt="rate-tag" />
                </div>
            </div>
        </section>
    )
}