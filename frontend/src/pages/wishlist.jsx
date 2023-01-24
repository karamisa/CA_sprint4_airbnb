import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { stayService } from '../services/stay.service.local.js'
import { AppHeader } from '../cmps/header-footer/app-header.jsx'
// import { loadStays } from '../store/stay/stay.action.js'


export function WishList() {
    const navigate = useNavigate()
    const [stays, setStays] = useState(null)
    const [foundStay, setFoundStay] = useState(null)
    const user = useSelector(state => state.userModule.user)
    const searchId = user._id
    // let foundStay
    console.log('user', user)
    console.log('stays', stays)

    useEffect(() => {
        loadStays()
    }, [])

    // if(stays){
    //  foundStay = stays.filter(stay => {
    //     return stay.likedByUsers.some(likedByUser => likedByUser._id === searchId)
    // })
    // }
    console.log('foundStay', foundStay)

    async function loadStays() {
        try {
            const stays = await stayService.getAllStays()
            setStays(stays)
            console.log('stays', stays)
            setFoundStay(stays.filter(stay => {
                return stay.likedByUsers.some(likedByUser => likedByUser._id === searchId)
            }))
        } catch (err) {
            console.log('Had issues in stay details', err)
            // showErrorMsg('Cannot load stay')
            //   navigate('/stay')
        }
    }


    return (
        <>
            <AppHeader className='secondary-layout' />
            <div>  hello {user.fullname}, </div>
            {!foundStay && <div>  your wishlist is empty </div>}
            {foundStay && <div>
                <div>  your wishlist:</div>
                <ul>
                    {foundStay.map((stay,index) => {
                        return (
                            <li key={stay._id} onClick={() => navigate(`/stay/${stay._id}`)} style={{cursor:"pointer"}}>
                                <span>{index + 1}: </span>
                                <span style={{textDecoration:"underline"}}>{stay.name}</span>
                                <span style={{textDecoration:"underline"}}>{stay.price}</span>
                                <span style={{textDecoration:"underline"}}>{stay.loc.address}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            }
        </>
    )
}