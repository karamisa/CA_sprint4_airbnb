import { utilService } from "../../services/util.service";
import { SearchBtn } from "./search-btn";


export function SearchPreview({handlePreviewClick, staySearchParams}) {
    const {location, checkIn, checkOut, guests} = staySearchParams

    const locationContent = location || 'Anywhere'
    const dateContent = (checkIn && checkOut) ? `${utilService.formattedDate(+checkIn)} - ${utilService.formattedDate(+checkOut)}` : 'Any week'
    const guestsContent = guests.adults ? `${guests.adults} guests` : 'Add guests'
    
    return (
        <div className="search-preview" >
            <button className="search-anywhere" onClick={()=> handlePreviewClick('location')}>{locationContent}</button>
            <span className="splitter"></span>
            <button className="search-any-week" onClick={()=> handlePreviewClick('checkIn')}>{dateContent}</button>
            <span className="splitter"></span>
            <button className="search-add-guests" onClick={()=> handlePreviewClick('guests')}>{guestsContent}</button>
            <SearchBtn />
        </div>
)
}