import { useSearchParams } from 'react-router-dom'

import { utilService } from '../../services/util.service.js'

import { DateSelect } from './../search-cmps/date-select.jsx'
import { BtnSquareBlack } from '../ui/buttons/btn-square-black.jsx'

export function StayCalendar() {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderParams = {
        checkIn: searchParams.get('checkIn')
            ? new Date(+searchParams.get('checkIn'))
            : '',
        checkOut: searchParams.get('checkOut')
            ? new Date(+searchParams.get('checkOut'))
            : '',
        guests: {
            adults: +searchParams.get('adults') || 1,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        },
    }

    let monthsToShow = 1
    function onSetField(field, value) {
        console.log(searchParams)
        if (field === 'guests') {
            searchParams.set('adults', value.adults)
            searchParams.set('children', value.children)
            searchParams.set('infants', value.infants)
            searchParams.set('pets', value.pets)
        }
        if (field === 'checkIn' || field === 'checkOut') {
            if (value) {
                value = value.getTime()
            }
            searchParams.set(field, value)
        }
        setSearchParams(searchParams)
    }

    return (
        <section className='stay-calendar-container'>
            <section className='date-picker-modal'>
                <div className='date-picker-header'>
                    <h4>{utilService.totalDays(orderParams.checkIn, orderParams.checkOut)} nights</h4>
                    {!!orderParams.checkIn && !!orderParams.checkOut && <h5>{utilService.ShortFormattedDate(orderParams.checkIn)}-{utilService.ShortFormattedDate(orderParams.checkOut)}</h5>}
                </div>
                <DateSelect
                    checkIn={orderParams.checkIn}
                    checkOut={orderParams.checkOut}
                    onSetField={onSetField}
                    monthsToShow = {monthsToShow}
                    className='date-picker'
                />
                <div className="date-picker-modal-btns">
                    <button className="reset-dates-btn clean-button" onClick={() => { onSetField('checkIn', ''); onSetField('checkOut', '') }}>Clear dates</button>
                </div>
            </section>
        </section>
    )
}