import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { stayService } from '../services/stay.service.local.js'
import { AppHeader } from '../cmps/header-footer/app-header.jsx'
import { AppFooter } from '../cmps/header-footer/app-footer.jsx'
import { WishlistList } from '../cmps/wishlist-list.jsx'
// import { loadStays } from '../store/stay/stay.action.js'

import { likeStay } from '../store/stay/stay.action.js'

export function WishList() {
    const [stays, setStays] = useState(null)
    const [likedStay, setFoundStay] = useState(null)
    const user = useSelector(state => state.userModule.user)
    const searchId = user._id

    useEffect(() => {
        loadStays()
    }, [])

    console.log('likedStay', likedStay)

    async function loadStays() {
        try {
            const stays = await stayService.getAllStays()
            setStays(stays)
            setFoundStay(stays.filter(stay => {
                return stay.likedByUsers.some(likedByUser => likedByUser._id === searchId)
            }))
        } catch (err) {
            console.log('Had issues in stay details', err)
            // showErrorMsg('Cannot load stay')
            //   navigate('/stay')
        }
    }

   async  function onRemoveLike(stayId, ev) {
        ev.stopPropagation()
        const updatedStay = await likeStay(stayId)
        loadStays()
    }

    return (
        <>
            <AppHeader className='secondary-layout' />
            <div className='secondary-layout hero'>  hello {user.fullname}, </div>
            {!likedStay && <div className='secondary-layout'>  your wishlist is empty </div>}
            {likedStay && <div className='secondary-layout'>
                <div className='hero'>
                    your wishlist:</div>
                <WishlistList stays={likedStay} onRemoveLike={onRemoveLike} />
            </div>
            }
            <AppFooter className='main-layout fixed' />
        </>
    )
}
