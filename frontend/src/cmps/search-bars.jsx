import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchForm as StaySearchForm } from './search-form';
import { SearchPreview } from './search-preview';


export function SearchBars() {
    const [searchFormOpen, setSearchFormOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const tabToOpen = useRef('location')

    const staySearchParams = {
        location: searchParams.get('location') || '',
        checkIn: searchParams.get('checkIn') ? new Date(+searchParams.get('checkIn')) : '',
        checkOut: searchParams.get('checkOut') ? new Date(+searchParams.get('checkOut')) : '',
        guests: {
            adults: +searchParams.get('guests[adults]') || 0,
            children: +searchParams.get('guests[children]') || 0,
            infants: +searchParams.get('guests[infants]') || 0,
            pets: +searchParams.get('guests[pets]') || 0,
        }
    }

    const handleToggle = () => {
        setSearchFormOpen(prev => !prev)
    }
    
    function handlePreviewClick(tabToSet) {
        tabToOpen.current = tabToSet
        handleToggle()
    }

    if (searchFormOpen) {
        return (<StaySearchForm staySearchParams={staySearchParams} handleToggle={handleToggle} tabToOpen={tabToOpen.current} />)
    } else {
        return (<SearchPreview staySearchParams={staySearchParams} handlePreviewClick={handlePreviewClick} />)
    }
}