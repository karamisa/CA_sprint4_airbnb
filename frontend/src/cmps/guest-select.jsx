export function GuestSelect() {
    return (
        <div className="guest-select">
            <div class="guest-select-adult flex justify-between">
                <div class="guest-select-label">
                    <div class="guest-select-adults">
                        Adults
                    </div>
                    <div class="adults-subheader">
                        Ages 13 or above
                    </div>
                </div>
                    <div class="guest-select-stepper-btn flex">
                        <button class="stepper-btn">
                            +
                        </button>
                        <div class="stepper-value">
                            1
                        </div>
                        <button class="stepper-btn">
                          - 
                        </button>
                    </div>
            </div>
            <div class="guest-select-children flex justify-between">
                <div class="guest-select-label">
                    <div class="guest-select-adults">
                        Children
                    </div>
                    <div class="adults-subheader">
                        Ages 2-12
                    </div>
                </div>

                    <div class="guest-select-stepper-btn flex">
                        <button class="stepper-btn">
                            +
                        </button>
                        <div class="stepper-value">
                            1
                        </div>
                        <button class="stepper-btn">
                          -
                        </button>
                    </div>
            </div>
            <div class="guest-select-infants flex justify-between">
                <div class="guest-select-label">
                    <div class="guest-select-adults">
                        Infants
                    </div>
                    <div class="adults-subheader">
                        Under 2
                    </div>
                </div>

                    <div class="guest-select-stepper-btn flex">
                        <button class="stepper-btn" type="button" aria-label="Decrease number of adults">
                            +
                        </button>
                        <div class="stepper-value">
                            1
                        </div>
                        <button class="stepper-btn" type="button" aria-label="Increase number of adults">
                          -
                        </button>
                    </div>
            </div>
            <div class="guest-select-pets flex justify-between" data-testid="search-block-filter-stepper-row-stepper-adults">
                <div class="guest-select-label">
                    <div class="guest-select-adults">
                        Pets
                    </div>
                    <div class="adults-subheader">
                        <a href="">Bringing a Service Animal?</a>
                    </div>
                </div>

                    <div class="guest-select-stepper-btn flex">
                        <button class="stepper-btn" type="button" aria-label="Decrease number of adults">
                            +
                        </button>
                        <div class="stepper-value">
                            1
                        </div>
                        <button class="stepper-btn" type="button" aria-label="Increase number of adults">
                          -
                        </button>
                    </div>
            </div>
            </div>)
}