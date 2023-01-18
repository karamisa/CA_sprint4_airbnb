import { useState } from "react";
import { SearchBtn } from "./search-btn";
import { RegionSelect } from "./region-select";
import { DateSelect } from "./date-select.jsx";
import { GuestSelect } from "./guest-select.jsx";
export function SearchForm() {
    const [selectedCategory, setSelectedCategory] = useState('location');
    function onCategoryClick(category) {
        setSelectedCategory(category);
    }

    const locationOpt = (selectedCategory === 'location') ? ' active' : '';
    const checkinOpt = (selectedCategory === 'checkin') ? ' active' : '';
    const checkoutOpt = (selectedCategory === 'checkout') ? ' active' : '';
    const guestOpt = (selectedCategory === 'guests') ? ' active' : '';

    return (
        <section className="search-form">
            <div className="search-form-menu">

                {/* where */}
                <div className="input-query">
                    <div className={"search-category location" + (locationOpt)} onClick={() => onCategoryClick('location')}>
                        <div className="search-form-label">Where</div>
                        <input type="text" className="search-form-desc" placeholder="Search destinations" />
                    </div>
                        {selectedCategory === 'location' &&
                            <div className="region-select-container">
                                <RegionSelect />
                            </div>}
                </div>

                <div className="input-split-date">
                    {/* check in */}
                    <div className={"search-category check-in" + (checkinOpt)} onClick={() => onCategoryClick('checkin')}>
                        <div className="search-form-label">Check in</div>
                        <div className="search-form-desc">Add dates</div>
                    </div>

                    {/* check out */}
                    <div className={"search-category check-out" + (checkoutOpt)} onClick={() => onCategoryClick('checkout')}>
                        <div className="search-form-label">Check out</div>
                        <div className="search-form-desc">Add dates</div>
                    </div>
                    {(selectedCategory === 'checkin' || selectedCategory === 'checkout') &&
                            <div className="date-select-container">
                                <DateSelect />
                            </div>}
                </div>

                {/* guests */}
                <div className={"input-with-search" + (guestOpt)}>
                    <div className={"search-category add-guests"} onClick={() => onCategoryClick('guests')}>
                        <div className="search-form-label">Who</div>
                        <div className="search-form-desc">Add guests</div>
                    </div>
                    <SearchBtn />
                    {selectedCategory === 'guests' &&
                            <div className="guest-select-container">
                                <GuestSelect />
                            </div>}

                </div>
            </div>
        </section>
    );
}