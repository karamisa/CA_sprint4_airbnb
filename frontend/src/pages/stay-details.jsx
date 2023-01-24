import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { stayService } from '../services/stay.service.local.js'
import { useModal } from '../customHooks/useModal'

import { AmenitiesList } from '../cmps/stay-details/amenities-list.jsx'
import { ReviewsCmp } from '../cmps/stay-details/reviews-cmp.jsx'
import { ReviewBar } from '../cmps/stay-details/review-bar.jsx'
import { OrderModal } from '../cmps/stay-details/order-modal.jsx'
import { AppFooter } from '../cmps/header-footer/app-footer.jsx'
import { AppHeader } from '../cmps/header-footer/app-header.jsx'
import { RatingReview } from '../cmps/ui/rating-review.jsx'
import { ImgGrid } from '../cmps/ui/img-grid.jsx'
import { BtnSquare } from '../cmps/ui/buttons/btn-square.jsx'
import { DetailsHeart } from '../cmps/ui/details-heart.jsx'
import { AllAmenities } from '../cmps/stay-details/all-amenities.jsx'
import { AllReviews } from '../cmps/stay-details/all-reviews.jsx'
import { AboutHost } from '../cmps/stay-details/about-host.jsx'
import useOnScreen from '../customHooks/useOnScreen.js'
import { BtnSquareColor } from '../cmps/ui/buttons/btn-square-color.jsx'


export function StayDetails() {
  const [stay, setStay] = useState(null)
  const [wishList, setWishList] = useState(null)
  const { stayId } = useParams()
  const navigate = useNavigate()
  const [like, setLike] = useState(false)
  const { openModal, Modal } = useModal()
  const imgGridRef = useRef()
  const reserveBtnRef = useRef()
  const [refVisible, setRefVisible] = useState(false)
  const imgGridVisible = useOnScreen(imgGridRef, '0px')
  const reserveBtnVisible = useOnScreen(reserveBtnRef, '-220px')
  const user = useSelector(state => state.userModule.user)
  const loggedinUser = (!user) ? false : true

  useEffect(() => {
    if (!refVisible) {
      return
    }
  }, [refVisible])

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
      setWishList(stay.wishList)
    } catch (err) {
      console.log('Had issues in stay details', err)
      // showErrorMsg('Cannot load toy')
      navigate('/stay')
    }
  }

  function openReviewModal() { }

  function openReviewMap() { }

  function onSaveStay() {
    console.log('wishList', wishList)
    if (!loggedinUser) {
      console.log('login first')
      return
    }
    setLike(!like)
    if (like) {
      console.log('save stay')
    }
    else {
      console.log('unsave stay')
    }
    console.log('stay', stay)
  }

  function onOpenStayGallery() {
    console.log('open gallery')
  }


  function onToggleReviews() {


  }




  return (
    <>
      <AppHeader className='secondary-layout' />
       <div className="details-modal"> <Modal /></div>
       {(!stay) && <h1 style={{textAlign: 'center', marginTop: '20px', fontSize: '1rem'}}>Loading...</h1>}
       {(!!stay) &&
       <>
      <div className={'sudo-header secondary-layout'} style={{ display: imgGridVisible ? 'none' : 'flex' }} >
        <div className='anchor-links'>
          <a className='anchor-link' href='imgs' >Photos</a>
          <a className='anchor-link' href='imgs' >Amenities</a>
          <a className='anchor-link' href='imgs' >Reviews</a>
          <a className='anchor-link' href='imgs' >Location</a>
        </div>
        <div className='book-it-details' style={{ display: reserveBtnVisible ? 'none' : 'flex' }}>
          <header className='order-form-header'>
            <h4>
              <span>${(Math.round(stay.price)).toLocaleString()}</span> night
            </h4>
            <div className='order-rating-review flex'>
              <RatingReview reviews={stay.reviews} />
              <span>•</span>
              <div
                className='stay-rating'>
                {stay.reviews.length} reviews
              </div>
            </div>
          </header>

          <BtnSquareColor children={'Reserve'} />
        </div>
      </div>
      <section className='secondary-layout'>

        <section className='stay-details'>
          <h1 className='title'>{stay.name}</h1>
          <div className='flex justify-between'>
            <div className='name-subtitle flex'>
              <RatingReview reviews={stay.reviews} />
              <span>•</span>
              <div className='stay-rating' onClick={openReviewModal}>
                {stay.reviews.length} reviews
              </div>
              <span>•</span>
              <div className='stay-location' onClick={openReviewMap}>
                {stay.loc.address}
              </div>
            </div>
            <button className='save-stay active' onClick={onSaveStay}>
              <div className="heart">
                <DetailsHeart cb={(like) => setLike(like)} /></div>
            </button>
          </div>

          <div ref={el => { imgGridRef.current = el; setRefVisible(!!el); }}>
            <ImgGrid
              imgsToDisplay={imgsToDisplay}
              onOpenStayGallery={onOpenStayGallery}
            />
          </div>

          <section className='stay-review-mid grid border-buttom'>
            <div className='stay-review-details'>
              <div className='about-host border-buttom'>
                <AboutHost stay={stay} />
              </div>
              <div className='stay-highlights border-buttom'>
                can be hardcoaded
              </div>
              <div className='air-cover border-buttom'>
                <h3>
                  <span>air</span>cover
                </h3>
                <p>
                  Every booking includes free protection from Host
                  cancellations, listing inaccuracies, and other issues like
                  trouble checking in.
                </p>
              </div>
              <div className='stay-summery border-buttom'>{stay.summary}</div>
              <div className='stay-amenities'>
                <h4 className='subheading'>What this place offers</h4>
                {amenitiesToDisplay && (
                  <AmenitiesList amenitiesToDisplay={amenitiesToDisplay} />
                )}
                {stay.amenities.length > 10 && (
                  <BtnSquare
                    className='rev-btn show-all-amenities'
                    onClick={() => openModal(<AllAmenities amenities={stay.amenities} />)}>
                    show all {stay.amenities.length} amenities{' '}
                  </BtnSquare>
                )}
              </div>
              <div className='stay-calendar'></div>
            </div>

            <div ref={reserveBtnRef} className='stay-review-order'>
              <OrderModal stay={stay} />
            </div>
          </section>

          <div className='reviews border-buttom'>
            <h2 className='stay-mid-reviews flex'>
              <RatingReview reviews={stay.reviews} /> • {stay.reviews.length}{' '}
              reviews
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
                onClick={() => openModal(<AllReviews reviews={stay.reviews} />)}>
                show all {stay.reviews.length} reviews{' '}
              </BtnSquare>
            )}
          </div>
          <div className='stay-map border-buttom'>Where you'll be</div>

          <div className='stay-about-host border-buttom'>
            <BtnSquare className='rev-btn contact host'>contact host</BtnSquare>
          </div>
        </section>
      </section>
      </>}
      <AppFooter className='secondary-layout' />
    </>
  )
}
