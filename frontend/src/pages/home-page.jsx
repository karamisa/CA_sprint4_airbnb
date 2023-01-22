import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BtnNavRounded } from '../cmps/ui/buttons/btn-nav-rounded'


export function HomePage() {

    const navigate = useNavigate()


    function onGoToList() {
        navigate('/stay')
    }


    return (
        <section>
            <h1>Home</h1>
            <BtnNavRounded><h2 onClick={onGoToList}>Go to list</h2></BtnNavRounded>
        </section >
    )
}