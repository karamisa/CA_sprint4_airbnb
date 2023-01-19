export function GuestSelect() {
    return (
        <div className="guest-select">
            <div className="guest-select-adult flex justify-between">
                <div className="guest-select-label">
                    <div className="guest-select-adults">
                        Adults
                    </div>
                    <div className="adults-subheader">
                        Ages 13 or above
                    </div>
                </div>
                    <div className="guest-select-stepper-btn flex">
                        <button className="stepper-btn">
                            +
                        </button>
                        <div className="stepper-value">
                            1
                        </div>
                        <button className="stepper-btn">
                          - 
                        </button>
                    </div>
            </div>
            <div className="guest-select-children flex justify-between">
                <div className="guest-select-label">
                    <div className="guest-select-adults">
                        Children
                    </div>
                    <div className="adults-subheader">
                        Ages 2-12
                    </div>
                </div>

                    <div className="guest-select-stepper-btn flex">
                        <button className="stepper-btn">
                            +
                        </button>
                        <div className="stepper-value">
                            1
                        </div>
                        <button className="stepper-btn">
                          -
                        </button>
                    </div>
            </div>
            <div className="guest-select-infants flex justify-between">
                <div className="guest-select-label">
                    <div className="guest-select-adults">
                        Infants
                    </div>
                    <div className="adults-subheader">
                        Under 2
                    </div>
                </div>

                    <div className="guest-select-stepper-btn flex">
                        <button className="stepper-btn" type="button" aria-label="Decrease number of adults">
                            +
                        </button>
                        <div className="stepper-value">
                            1
                        </div>
                        <button className="stepper-btn" type="button" aria-label="Increase number of adults">
                          -
                        </button>
                    </div>
            </div>
            <div className="guest-select-pets flex justify-between" data-testid="search-block-filter-stepper-row-stepper-adults">
                <div className="guest-select-label">
                    <div className="guest-select-adults">
                        Pets
                    </div>
                    <div className="adults-subheader">
                        <a href="">Bringing a Service Animal?</a>
                    </div>
                </div>

                    <div className="guest-select-stepper-btn flex">
                        <button className="stepper-btn" type="button" aria-label="Decrease number of adults">
                            +
                        </button>
                        <div className="stepper-value">
                            1
                        </div>
                        <button className="stepper-btn" type="button" aria-label="Increase number of adults">
                          -
                        </button>
                    </div>
            </div>
            </div>)
}