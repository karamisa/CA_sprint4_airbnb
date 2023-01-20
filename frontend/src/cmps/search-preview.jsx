import { utilService } from "../services/util.service";
import { SearchBtn } from "./search-btn";


export function SearchPreview({handleToggle, staySearchParams}) {
    const {location, checkIn, checkOut, guests} = staySearchParams

    const locationContent = location || 'Anywhere'
    const dateContent = (checkIn && checkOut) ? `${utilService.formattedDate(+checkIn)} - ${utilService.formattedDate(+checkOut)}` : 'Any week'
    const guestsContent = guests.adults ? `${guests.adults} guests` : 'Add guests'
    
    return (
            <div className="search-preview" onClick={handleToggle}>
                <button className="search-anywhere">{locationContent}</button>
                <span className="splitter"></span>
                <button className="search-any-week">{dateContent}</button>
                <span className="splitter"></span>
                <button className="search-add-guests">{guestsContent}</button>
                <SearchBtn />
            </div>
    );
}