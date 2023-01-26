import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { utilService } from '../../services/util.service'

import FreeCancel from '../../assets/img/highlights/free-cancelation.svg'
import FurryFriends from '../../assets/img/highlights/furry-friends.svg'
import GreatCheckIn from '../../assets/img/highlights/great-checkin.svg'
import GreatLocation from '../../assets/img/highlights/great-location.svg'


export function StayHighlights() {

const [searchParams, setSearchParams] = useSearchParams()

// const checkInDate = searchParams.get('checkIn')? new Date(+searchParams.get('checkIn')) : ''
const today = new Date().getTime()
const checkInDate = searchParams.get('checkIn')? +searchParams.get('checkIn') : today
const daysToCheckIn = (checkInDate - today) / (1000 * 60 * 60 * 24)
const isMoreThanFiveDays = (daysToCheckIn > 5)
const dateToCancel = utilService.ShortFormattedDate(checkInDate - (1000 * 60 * 60 * 24 * 5))

    const highlightMap = {
        "Great location": GreatLocation,
        "Great checkin": GreatCheckIn,
        "Furry friends": FurryFriends,
        "Free cancelation": FreeCancel,
    }

    return (
        <>
            <div className="great-location highlight flex">
                <img src={highlightMap["Great location"]} className="highlight-img" alt="highlightImg" />
                <div className="highlight-txt great-location-txt">
                    <h3>Great location</h3>
                    <p>100% of recent guests gave the location a 5-star rating.</p>
                </div>
            </div>
            <div className="great-checkin highlight flex">
                <img src={highlightMap["Great checkin"]} className="highlight-img" alt="highlightImg" />
                <div className="highlight-txt great-checkin-txt">
                    <h3>Great check-in experiance</h3>
                    <p>100% of recent guests gave the check-in process a 5-star rating.</p>
                </div>
            </div>

        {!isMoreThanFiveDays &&
            <div className="furry-friends highlight flex">
                <img src={highlightMap["Furry friends"]} className="highlight-img" alt="highlightImg" />
                <div className="highlight-txt great-checkin-txt">
                    <h3>Great check-in experiance</h3>
                    <p>Bring your pets along for the stay.</p>
                </div>
            </div>
        }
        {isMoreThanFiveDays &&
            <div className="free-cancelation highlight flex">
                <img src={highlightMap["Free cancelation"]} className="highlight-img" alt="highlightImg" />
                <div className="highlight-txt great-checkin-txt">
                    <h3><span>Free cancellation </span><span>before {dateToCancel}</span></h3>
                </div>
            </div>
        }



        </>
    )

}