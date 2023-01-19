import { useState } from "react";
import { SearchBtn } from "./search-btn";
import { RegionSelect } from "./region-select";
import { DateSelect } from "./date-select.jsx";
import { GuestSelect } from "./guest-select.jsx";
import { useForm } from "../customHooks/useForm";

export function SearchForm({filterBy}) {
    const [selectedTab, setSelectedTab] = useState('location');
    const {location, checkIn, checkout, guests} = filterBy
    const [fields, setFields, handleChange] = useForm({location, checkIn, checkout, guests})
    console.log(fields)

    function handleSubmit(ev) {
        ev.preventDefault();
        console.log('fields', fields);
    }

    function onCategoryClick(category) {
        setSelectedTab(category);
    }





    const locationOpt = (selectedTab === 'location') ? ' active' : '';
    const checkinOpt = (selectedTab === 'checkin') ? ' active' : '';
    const checkoutOpt = (selectedTab === 'checkout') ? ' active' : '';
    const guestOpt = (selectedTab === 'guests') ? ' active' : '';

    return (
        <section className="search-form">
            <div className="search-form-menu">

                {/* Location */}
                <div className="input-query">
                    <div className={"search-category location" + (locationOpt)} onClick={() => onCategoryClick('location')}>
                        <div className="search-form-label">Where</div>
                        <input type="text" name='location' className="search-form-desc" placeholder="Search destinations" value={fields.location} onChange={handleChange}/>
                    </div>
                    {selectedTab === 'location' &&
                        <div className="region-select-container">
                            <RegionSelect setFields={setFields}/>
                        </div>}
                </div>

                {/* checkIn/checkOut */}
                <div className="input-split-date">
                    <div className={"search-category check-in" + (checkinOpt)} onClick={() => onCategoryClick('checkin')}>
                        <div className="search-form-label">Check in</div>
                        <div className="search-form-desc">Add dates</div>
                    </div>
                    <div className={"search-category check-out" + (checkoutOpt)} onClick={() => onCategoryClick('checkout')}>
                        <div className="search-form-label">Check out</div>
                        <div className="search-form-desc">Add dates</div>
                    </div>
                    {(selectedTab === 'checkin' || selectedTab === 'checkout') &&
                        <div className="date-select-container">
                            <DateSelect />
                        </div>}
                </div>

                {/* Guests */}
                <div className={"input-with-search" + (guestOpt)}>
                    <div className={"search-category add-guests"} onClick={() => onCategoryClick('guests')}>
                        <div className="search-form-label">Who</div>
                        <div className="search-form-desc">Add guests</div>
                    </div>
                    <SearchBtn onClick={handleSubmit}/>
                    {selectedTab === 'guests' &&
                        <div className="guest-select-container">
                            <GuestSelect />
                        </div>}

                </div>
            </div>
        </section>
    );
}