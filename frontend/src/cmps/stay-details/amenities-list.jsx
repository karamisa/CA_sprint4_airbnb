

export function AmenitiesList({amenitiesToDisplay}) {

    if(!amenitiesToDisplay || !Array.isArray(amenitiesToDisplay))return <div>Loading...</div>
    return (
        <ul className="amenities-container grid">
            {amenitiesToDisplay.map((amenity, index) => (
                <li key={index}>
                    {amenity}
                    {/* <StayAmenity amenity={amenity}/> */}
                </li>
            ))}
        </ul>
    )
}