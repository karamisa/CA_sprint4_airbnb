import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { stayService } from '../services/stay.service.local.js'
import { AppHeader } from '../cmps/header-footer/app-header.jsx'
import { AppFooter } from '../cmps/header-footer/app-footer.jsx'
import { WishlistList } from '../cmps/wishlist-list.jsx'
// import { loadStays } from '../store/stay/stay.action.js'

import { onLikeStayOptimistic } from '../store/stay/stay.action.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { Logo } from '../cmps/logo.jsx'
import { NavMenu } from '../cmps/nav-menu.jsx'

export function WishList() {
  const [stays, setStays] = useState(null)
  const [likedStay, setFoundStay] = useState(null)
  const user = useSelector((state) => state.userModule.user)
  const searchId = user._id

  useEffect(() => {
    loadStays()
  }, [])

  console.log('likedStay', likedStay)

  async function loadStays() {
    try {
      const stays = await stayService.getAllStays()
      setStays(stays)
      setFoundStay(
        stays.filter((stay) => {
          return stay.likedByUsers.some(
            (likedByUser) => likedByUser._id === searchId
          )
        })
      )
    } catch (err) {
      showErrorMsg('Cannot load stay')
    }
  }

  async function onRemoveLike(stayId, ev) {
    ev.stopPropagation()
    const updatedStay = await onLikeStayOptimistic(stayId)
    loadStays()
  }

  return (
    <>
      {/* <AppHeader className='secondary-layout' /> */}
      <header className='app-header secondary-layout-p flex'>
        <div className='header-logo-container'>
          <Logo />
        </div>
        <div className='spacer'></div>
        <div className='header-menu-container'>
          <NavMenu />
        </div>
      </header>

      {!likedStay && (
        <div className='secondary-layout-p wish-list'>
          {' '}
          Your wishlist is empty{' '}
        </div>
      )}
      {likedStay && (
        <div className='secondary-layout-p wish-list'>
          <WishlistList stays={likedStay} onRemoveLike={onRemoveLike} />
        </div>
      )}
    </>
  )
}
