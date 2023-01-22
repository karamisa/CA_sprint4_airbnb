import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { utilService } from '../../services/util.service.js';
import arrowDownImg from '../../assets/img/arrow-down.svg';
import arrowUpImg from '../../assets/img/arrow-up.svg';

import { OrderDetails } from './order-details.jsx';
import { DateSelect } from './../date-select.jsx';
import { GuestSelect } from './../guest-select.jsx';
import { BtnSquareColor } from '../ui/buttons/btn-square-color.jsx';
import { RatingReview } from '../ui/rating-review.jsx';

export function OrderModal({ stay }) {
  const [openTab, setOpenTab] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
  };

  function onSetField(field, value) {
    console.log(searchParams);
    if (field === 'guests') {
      searchParams.set('adults', value.adults);
      searchParams.set('children', value.children);
      searchParams.set('infants', value.infants);
      searchParams.set('pets', value.pets);
    }
    if (field === 'checkIn' || field === 'checkOut') {
      value = value.getTime();
      searchParams.set(field, value);
    }
    setSearchParams(searchParams);
  }

  function onClickReserve() {
    const paramsToSet = utilService.objectToSearchParams({
      checkIn: orderParams.checkIn.getTime(),
      checkOut: orderParams.checkOut.getTime(),
      adults: orderParams.guests.adults,
      children: orderParams.guests.children,
      infants: orderParams.guests.infants,
      pets: orderParams.guests.pets,
    });
<<<<<<< HEAD
    console.log(paramsToSet)
=======
>>>>>>> 0e5769930e465ee5c6e9bb39dd9b279d28824899
    navigate(`/book/stay/${stay._id}?${paramsToSet}`);
  }

  const checkInSubHeading = orderParams.checkIn
    ? `${utilService.formattedDate(+orderParams.checkIn)}`
    : 'Add Date';
  const checkOutSubHeading = orderParams.checkOut
    ? `${utilService.formattedDate(+orderParams.checkOut)}`
    : 'Add Date';

  function getGuestsSubHeading() {
    var guestSubheading = '';
    const { adults, children, infants, pets } = orderParams.guests;
    if (adults) guestSubheading += `${adults} adults`;
    if (children) guestSubheading += `, ${children} children`;
    if (infants) guestSubheading += `, ${infants} infants`;
    if (pets) guestSubheading += `, ${pets} pets`;
    if (guestSubheading === '1 adults')
      guestSubheading = guestSubheading.replace('1 adults', '1 adult');
    if (!guestSubheading) guestSubheading = 'Add Guests';
    return guestSubheading;
  }

  return (
    <section className='order-modal'>
      <div className='order-modal-form flex'>
        {/* HEADER - Price + Reviews */}
        <header className='order-form-header flex'>
          <h4>
            <span>${Math.round(stay.price)}</span> night
          </h4>
          <div className='order-rating-review flex'>
            <RatingReview reviews={stay.reviews} />
            <span>•</span>
            <div
              className='stay-rating'
              onClick={() => setOpenTab('reviews-modal')}>
              {stay.reviews.length} reviews
            </div>
          </div>
        </header>

        {/* Reservation Edit */}
        <section className='picker-container'>
          {/* Dates: checkIn/checkOut */}
          <section className='date-picker-modal'>
            {(openTab === 'checkIn' || openTab === 'checkOut') && (
              <DateSelect
                checkIn={orderParams.checkIn}
                checkOut={orderParams.checkOut}
                onSetField={onSetField}
                className='date-picker'
              />
            )}
          </section>
          <section className='dates-selection flex'>
            <div
              onClick={() => setOpenTab('checkIn')}
              className='check-in picker'>
              <div className='checkin-heading'>Check-In</div>
              <div className='checkin-sub-heading'>{checkInSubHeading}</div>
            </div>

            <div
              onClick={() => setOpenTab('checkOut')}
              className='check-out picker'>
              <div className='checkout-heading'>Check-Out</div>
              <div className='checkin-sub-heading'>{checkOutSubHeading}</div>
            </div>
          </section>

          {/* Guests */}
          <div className='guest-picker' onClick={() => setOpenTab('guests')}>
            <div className='guests-heading'>Guests</div>
            <div className='guests-sub-heading'>{getGuestsSubHeading()}</div>
            <img
              src={openTab === 'guests' ? arrowUpImg : arrowDownImg}
              className='arrow-img'
              alt={openTab === 'guests' ? 'arrowUpImg' : 'arrowDownImg'}
            />
            {openTab === 'guests' && (
              <GuestSelect
                guests={orderParams.guests}
                onSetField={onSetField}
              />
            )}
          </div>
        </section>

        {/* Reserve/CheckAvailability Button */}

        {orderParams.checkIn && orderParams.checkOut && (
          <BtnSquareColor onClick={onClickReserve} children={'Reserve'} />
        )}
        {(!orderParams.checkIn || !orderParams.checkOut) && (
          <BtnSquareColor
            onClick={() => {
              setOpenTab('checkIn');
            }}
            children={'Check Availability'}
          />
        )}

        <section className='order-details flex'>
          {orderParams.checkIn && orderParams.checkOut && (
            <OrderDetails
              checkIn={orderParams.checkIn}
              checkOut={orderParams.checkOut}
              stay={stay}
            />
          )}
        </section>
      </div>
    </section>
  );
}
