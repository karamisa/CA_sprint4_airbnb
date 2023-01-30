import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { stayService } from '../services/stay.service.js'
import { useModal } from '../customHooks/useModal'
import { onLikeStayOptimistic } from '../store/stay/stay.action.js'

import { AmenitiesList } from '../cmps/stay-details/amenities-list.jsx'
import { ReviewsCmp } from '../cmps/stay-details/reviews-cmp.jsx'
import { ReviewBar } from '../cmps/stay-details/review-bar.jsx'
import { OrderModal } from '../cmps/stay-details/order-modal.jsx'
import { AppHeader } from '../cmps/header-footer/app-header.jsx'
import { RatingReview } from '../cmps/ui/rating-review.jsx'
import { ImgGrid } from '../cmps/ui/img-grid.jsx'
import { BtnSquare } from '../cmps/ui/buttons/btn-square.jsx'
import { DetailsHeart } from '../cmps/ui/details-heart.jsx'
import { AllAmenities } from '../cmps/stay-details/all-amenities.jsx'
import { AboutHost } from '../cmps/stay-details/about-host.jsx'
import useOnScreen from '../customHooks/useOnScreen.js'
import { LoginSignup } from '../cmps/login-signup.jsx'
import { SecondaryHeader } from '../cmps/stay-details/secondary-header.jsx'
import { StayMobileFooter } from '../cmps/header-footer/stay-mobile-footer.jsx'
import { StayHighlights } from '../cmps/stay-details/stay-highlights.jsx'
import { StayMap } from '../cmps/stay-details/stay-map.jsx'
import { StayCalendar } from '../cmps/stay-details/stay-calendar.jsx'
import { DetailsLoader } from '../cmps/stay-details/details-loader.jsx'

export function StayDetails() {
  const [stay, setStay] = useState(null)
  const [openTab, setOpenTab] = useState(null)
  const { stayId } = useParams()
  const navigate = useNavigate()
  const { openModal, Modal } = useModal()
  const imgGridRef = useRef()
  const reserveBtnRef = useRef()
  const [refVisible, setRefVisible] = useState(false)
  const imgGridVisible = useOnScreen(imgGridRef, '0px')
  const reserveBtnVisible = useOnScreen(reserveBtnRef, '-34px')
  const user = useSelector((state) => state.userModule.user)
  const isLoggedin = user ? true : false

  useEffect(() => {
    loadStay()
  }, [])

  const imgsToDisplay = stay?.imgUrls?.slice(0, 5)
  const amenitiesToDisplay = stay?.amenities?.slice(0, 10)
  const reviewsToDisplay = stay?.reviews?.slice(0, 6)

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Had issues in stay details', err)
      // showErrorMsg('Cannot load toy')
      navigate('/stay')
    }
  }

  function openReviewMap() {}

  async function onLikeStay(stayId) {
    if (!user) {
      openModal(<LoginSignup />)
      return
    } else {
      onLikeStayOptimistic(stayId)
    }
  }

  function onOpenStayGallery() {
    console.log('open gallery')
  }

  return (
    <>
      <AppHeader className='secondary-layout' />
      <div className='details-modal'>
        {' '}
        <Modal />
      </div>
      {!stay && <DetailsLoader />}
      {!!stay && (
        <>
          <SecondaryHeader
            stay={stay}
            imgGridVisible={imgGridVisible}
            reserveBtnVisible={reserveBtnVisible}
            setOpenTab={setOpenTab}
          />
          <section className='secondary-layout'>
            <section className='stay-details'>
              <h1 id='stay-top' className='title'>
                {stay.name}
              </h1>
              <div className='flex justify-between stay-title-subheader'>
                <div className='name-subtitle flex'>
                  <RatingReview reviews={stay.reviews} />
                  <span>•</span>
                  <div
                    className='stay-rating'
                    onClick={() =>
                      openModal(
                        <ReviewsCmp
                          reviewsToDisplay={reviewsToDisplay}
                          key={reviewsToDisplay.id}
                        />
                      )
                    }>
                    {stay.reviews.length} reviews
                  </div>
                  <span>•</span>
                  <div className='stay-location' onClick={openReviewMap}>
                    {stay.loc.address}
                  </div>
                </div>
                <button className='save-stay active'>
                  <div className='heart'>
                    <DetailsHeart
                      handleClick={() => onLikeStay(stay._id)}
                      isLiked={
                        !!user
                          ? stay.likedByUsers.find(
                              (miniUser) => miniUser._id === user._id
                            )
                          : false
                      }
                      isLoggedin={isLoggedin}
                    />
                  </div>
                </button>
              </div>

              <div
                ref={(el) => {
                  imgGridRef.current = el
                  setRefVisible(!!el)
                }}>
                <ImgGrid
                  imgsToDisplay={imgsToDisplay}
                  onOpenStayGallery={onOpenStayGallery}
                />
              </div>

              <section
                className='stay-review-mid grid border-buttom'
                id='stay-mid'>
                <div className='stay-review-details'>
                  <div className='about-host border-buttom'>
                    <AboutHost stay={stay} />
                  </div>
                  <div className='stay-highlights border-buttom'>
                    <StayHighlights />
                  </div>
                  <div className='air-cover border-buttom'>
                    <h3>
                      <img
                        src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg'
                        alt='aircover'
                      />
                    </h3>
                    <p>
                      Every booking includes free protection from Host
                      cancellations, listing inaccuracies, and other issues like
                      trouble checking in.
                    </p>
                  </div>
                  <div className='stay-summery border-buttom'>
                    {stay.summary}
                  </div>
                  <div id='amenities' className='stay-amenities border-buttom'>
                    <h4 className='subheading'>What this place offers</h4>
                    {amenitiesToDisplay && (
                      <AmenitiesList amenitiesToDisplay={amenitiesToDisplay} />
                    )}
                    {stay.amenities.length > 10 && (
                      <BtnSquare
                        className='rev-btn show-all-amenities'
                        onClick={() =>
                          openModal(<AllAmenities amenities={stay.amenities} />)
                        }>
                        show all {stay.amenities.length} amenities{' '}
                      </BtnSquare>
                    )}
                  </div>
                  <div className='stay-calendar'>
                    <StayCalendar />
                  </div>
                </div>

                <div className='stay-review-order'>
                  <OrderModal
                    stay={stay}
                    openTab={openTab}
                    setOpenTab={setOpenTab}
                    reserveBtnRef={reserveBtnRef}
                  />
                </div>
              </section>

              <div className='reviews border-buttom'>
                <h2 id='reviews' className='stay-mid-reviews flex'>
                  <RatingReview reviews={stay.reviews} />
                  <span className='stay-review-count'>
                    {' '}
                    • {stay.reviews.length} reviews
                  </span>
                </h2>
                <div className='stay-mid-reviews-container'>
                  <ReviewBar reviews={stay.reviews} />
                  <ReviewsCmp
                    reviewsToDisplay={reviewsToDisplay}
                    key={reviewsToDisplay.id}
                  />
                </div>
                {stay.reviews.length > 6 && (
                  <BtnSquare
                    className='rev-btn show-all-reviews'
                    onClick={() =>
                      openModal(
                        <ReviewsCmp
                          reviewsToDisplay={reviewsToDisplay}
                          key={reviewsToDisplay.id}
                        />
                      )
                    }>
                    show all {stay.reviews.length} reviews{' '}
                  </BtnSquare>
                )}
              </div>
              <div className='stay-map border-buttom'>
                <h1>Where you'll be</h1>
                <StayMap stay={stay} />
                <h3 className='stay-location-name'>
                  {stay.loc.country}, {stay.loc.city}
                </h3>
                <p>
                  Lexington, Kentucky is the second-largest city in Kentucky
                  next to Louisville, and is located in the heart of the
                  Bluegrass region. Lexington is known as the "Horse Capital of
                  the World," since it is home to the Kentucky Horse Park,
                  Keeneland race course and the Red Mile race course.
                </p>
              </div>
              <div className='stay-about-host'>
                <BtnSquare className='rev-btn contact host'>
                  contact host
                </BtnSquare>
              </div>
            </section>
          </section>
        </>
      )}
      <div className='details-app-footer'>
        {stay && <StayMobileFooter stay={stay} setOpenTab={setOpenTab} />}
      </div>
    </>
  )
}
