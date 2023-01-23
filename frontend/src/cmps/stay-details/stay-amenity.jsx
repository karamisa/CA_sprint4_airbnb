import Airconditioning from '../../assets/img/amenities/air-conditioning.svg'
import Balcony from '../../assets/img/amenities/balcony.svg'
import Beachfront from '../../assets/img/amenities/beachfront.svg'
import Bedlinens from '../../assets/img/amenities/bed-linens.svg'
import Blender from '../../assets/img/amenities/blender.svg'
import BoardGames from '../../assets/img/amenities/board-games.svg'
import Bodysoap from '../../assets/img/amenities/body-soap.svg'
import Buildingstaff from '../../assets/img/amenities/building-staff.svg'
import Carbonmonoxidedetector from '../../assets/img/amenities/carbon-monoxide-detector.svg'
import Cityskylineview from '../../assets/img/amenities/city-skyline-view.svg'
import Cleaningproducts from '../../assets/img/amenities/cleaning- products.svg'
import Coffeemaker from '../../assets/img/amenities/coffee-maker.svg'
import Cookingbasics from '../../assets/img/amenities/cooking-basics.svg'
import Crib from '../../assets/img/amenities/Crib.svg'
import Diningtable from '../../assets/img/amenities/dining-table.svg'
import Dishesandsilverware from '../../assets/img/amenities/dishes-and-silverware.svg'
import Dishwasher from '../../assets/img/amenities/dishwasher.svg'
import Doorman from '../../assets/img/amenities/doorman.svg'
import Dryer from '../../assets/img/amenities/dryer.svg'
import Elevator from '../../assets/img/amenities/elevator.svg'
import Essentials from '../../assets/img/amenities/essentials.svg'
import Ethernetconnection from '../../assets/img/amenities/ethernet-connection.svg'
import Extrapillowsandblankets from '../../assets/img/amenities/extra-pillows-and-blankets.svg'
import Fireextinguisher from '../../assets/img/amenities/fire-extinguisher.svg'
import Firepit from '../../assets/img/amenities/fire-pit.svg'
import Firstaidkit from '../../assets/img/amenities/first-aid-kit.svg'
import Freeparkingonpremises from '../../assets/img/amenities/free-parking-on-premises.svg'
import Freestreetparking from '../../assets/img/amenities/free-street-parking.svg'
import Gym from '../../assets/img/amenities/gym.svg'
import Hairdryer from '../../assets/img/amenities/hair-dryer.svg'
import Hangers from '../../assets/img/amenities/hangers.svg'
import Heating from '../../assets/img/amenities/heating.svg'
import HighChair from '../../assets/img/amenities/high-chair.svg'
import Hostgreetsyou from '../../assets/img/amenities/host-greets-you.svg'
import Hottub from '../../assets/img/amenities/hot-tub.svg'
import Hotwater from '../../assets/img/amenities/hot-water-kettle.svg'
import Hotwaterkettle from '../../assets/img/amenities/hot-water.svg'
import Iron from '../../assets/img/amenities/iron.svg'
import Kitchen from '../../assets/img/amenities/kitchen.svg'
import Laptopfriendlyworkspace from '../../assets/img/amenities/laptop-friendly-workspace.svg'
import Lockbox from '../../assets/img/amenities/lockbox.svg'
import Longtermstaysallowed from '../../assets/img/amenities/long-term-stays-allowed.svg'
import Microwave from '../../assets/img/amenities/Microwave.svg'
import Mountainview from '../../assets/img/amenities/mountain-view.svg'
import Oven from '../../assets/img/amenities/oven.svg'
import Paidparkingoffpremises from '../../assets/img/amenities/paid-parking-off-premises.svg'
import Paidparkingonpremises from '../../assets/img/amenities/paid-parking-on-premises.svg'
import Parkview from '../../assets/img/amenities/park-view.svg'
import Parking from '../../assets/img/amenities/parking.svg'
import Patioorbalcony from '../../assets/img/amenities/patio-or-balcony.svg'
import Petsallowed from '../../assets/img/amenities/pets-allowed.svg'
import Pool from '../../assets/img/amenities/pool.svg'
import Privateentrance from '../../assets/img/amenities/private-entrance.svg'
import Refrigerator from '../../assets/img/amenities/refrigerator.svg'
import Roomdarkeningshades from '../../assets/img/amenities/room-darkening-shades.svg'
import Safe from '../../assets/img/amenities/Safe.svg'
import Securitycameras from '../../assets/img/amenities/security-cameras.svg'
import Selfcheckin from '../../assets/img/amenities/self-check-in.svg'
import Shampoo from '../../assets/img/amenities/shampoo.svg'
import Singlelevelhome from '../../assets/img/amenities/Single level home.svg'
import Smokedetector from '../../assets/img/amenities/smoke-detector.svg'
import Smokingallowed from '../../assets/img/amenities/smoking-allowed.svg'
import Stepfreeaccess from '../../assets/img/amenities/step-free-access.svg'
import Stove from '../../assets/img/amenities/stove.svg'
import Suitableforevents from '../../assets/img/amenities/suitable-for-events.svg'
import Toaster from '../../assets/img/amenities/toaster.svg'
import TV from '../../assets/img/amenities/tv.svg'
import Valleyview from '../../assets/img/amenities/valley-view.svg'
import Wardrobe from '../../assets/img/amenities/wardrobe.svg'
import Washer from '../../assets/img/amenities/washer.svg'
import Waterfront from '../../assets/img/amenities/waterfront.svg'
import Wifi from '../../assets/img/amenities/wifi.svg'

export function StayAmenity({ amenity }) {

    const amenityMap = {
        "Air conditioning": Airconditioning,
        "Balcony": Balcony,
        "Beachfront": Beachfront,
        "Bed linens": Bedlinens,
        "Blender": Blender,
        "Board Games": BoardGames,
        "Body soap": Bodysoap,
        "Building staff": Buildingstaff,
        "Carbon monoxide detector": Carbonmonoxidedetector,
        "City skyline view": Cityskylineview,
        "Cleaning products": Cleaningproducts,
        "Coffee maker": Coffeemaker,
        "Cooking basics": Cookingbasics,
        "Crib": Crib,
        "Dining table": Diningtable,
        "Dishes and silverware": Dishesandsilverware,
        "Dishwasher": Dishwasher,
        "Doorman": Doorman,
        "Dryer": Dryer,
        "Elevator": Elevator,
        "Essentials": Essentials,
        "Ethernet connection": Ethernetconnection,
        "Extra pillows and blankets": Extrapillowsandblankets,
        "Fire extinguisher": Fireextinguisher,
        "Fire pit": Firepit,
        "First aid kit": Firstaidkit,
        "Free parking on premises": Freeparkingonpremises,
        "Free street parking": Freestreetparking,
        "Gym": Gym,
        "Hair dryer": Hairdryer,
        "Hangers": Hangers,
        "Heating": Heating,
        "High Chair": HighChair,
        "Host greets you": Hostgreetsyou,
        "Hot tub": Hottub,
        "Hot water": Hotwater,
        "Hot water kettle": Hotwaterkettle,
        "Iron": Iron,
        "Kitchen": Kitchen,
        "Laptop friendly workspace": Laptopfriendlyworkspace,
        "Lockbox": Lockbox,
        "Long term stays allowed": Longtermstaysallowed,
        "Microwave": Microwave,
        "Mountain view": Mountainview,
        "Oven": Oven,
        "Paid parking off premises": Paidparkingoffpremises,
        "Paid parking on premises": Paidparkingonpremises,
        "Park view": Parkview,
        "Parking": Parking,
        "Patio or balcony": Patioorbalcony,
        "Pets allowed": Petsallowed,
        "Pool": Pool,
        "Private entrance": Privateentrance,
        "Refrigerator": Refrigerator,
        "Room-darkening shades": Roomdarkeningshades,
        "Safe": Safe,
        "Security cameras": Securitycameras,
        "Self check-in": Selfcheckin,
        "Shampoo": Shampoo,
        "Single level home": Singlelevelhome,
        "Smoke detector": Smokedetector,
        "Smoking allowed": Smokingallowed,
        "Step-free access": Stepfreeaccess,
        "Stove": Stove,
        "Suitable for events": Suitableforevents,
        "Toaster": Toaster,
        "TV": TV,
        "Valley view": Valleyview,
        "Wardrobe": Wardrobe,
        "Washer": Washer,
        "Waterfront": Waterfront,
        "Wifi": Wifi,

    }


    // let amenityName = amenity.split(" ").join("")
    // amenityName = amenityName.replace(/-/g,'')
    // console.log('amenityName', amenityName)


    return (
        <>
            <img src={amenityMap[amenity]} className="amenity-img" alt="amenityImg" />
        </>
    )
}