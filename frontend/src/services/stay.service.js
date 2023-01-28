import { httpService } from './http.service'

export const stayService = {
    query,
    getById,
    remove,
    save,
    getEmptyStay,
    getAmenitiesList,
    addStayLike,
    removeStayLike
}

async function query(filterBy) {
    //can you not put the filterBy in the body?
    var queryStr = (!filterBy) ? '' : `?txt=${filterBy.txt || ''}&likedByUserId=${filterBy.likedByUserId || ''}`
    return await httpService.get(`stay${queryStr}` )
}

async function getById(stayId) {
    const stay= await httpService.get(`stay/${stayId}`)
    return stay
}

async function remove(stayId) {
    return await httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    if (stay._id) {
        return await httpService.put(`stay/${stay._id}`, stay)
    } else {
        return await httpService.post(`stay`, stay)
    }
}

async function addStayLike(stayId) {
    return await httpService.post(`stay/${stayId}/like`)
}

async function removeStayLike(stayId) {
    return await httpService.delete(`stay/${stayId}/like`)
}


function getEmptyStay() {
    return {
        _id: '',
        name: 'Magical Place',
        type: '',
        imgUrls: [
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg',
            'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
        ],
        price: 100,
        summary: 'An imaginary place far far away',
        capacity: '',
        amenities: [],
        labels: [''],
        host: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        loc: {
            country: 'Canada',
            countryCode: 'CA',
            city: 'Montreal',
            address: 'Montréal, QC, Canada',
            lat: -73.54985,
            lng: 45.52797,
        },
        reviews: [],
        likedByUsers: [],
    }
}

function getAmenitiesList() {
    return [
        'Air conditioning',
        'Balcony',
        'Beachfront',
        'Bed linens',
        'Blender',
        'Board Games',
        'Body soap',
        'Building staff',
        'Carbon monoxide detector',
        'City skyline view',
        'Cleaning products',
        'Coffee maker',
        'Cooking basics',
        'Crib',
        'Dining table',
        'Dishes and silverware',
        'Dishwasher',
        'Doorman',
        'Dryer',
        'Elevator',
        'Essentials',
        'Ethernet connection',
        'Extra pillows and blankets',
        'Fire extinguisher',
        'Fire pit',
        'First aid kit',
        'Free parking on premises',
        'Free street parking',
        'Gym',
        'Hair dryer',
        'Hangers',
        'Heating',
        'High Chair',
        'Host greets you',
        'Hot tub',
        'Hot water',
        'Hot water kettle',
        'Iron',
        'Kitchen',
        'Laptop friendly workspace',
        'Lockbox',
        'Long term stays allowed',
        'Microwave',
        'Mountain view',
        'Oven',
        'Paid parking off premises',
        'Paid parking on premises',
        'Park view',
        'Parking',
        'Patio or balcony',
        'Pets allowed',
        'Pool',
        'Private entrance',
        'Refrigerator',
        'Room-darkening shades',
        'Safe',
        'Security cameras',
        'Self check-in',
        'Shampoo',
        'Single level home',
        'Smoke detector',
        'Smoking allowed',
        'Step-free access',
        'Stove',
        'Suitable for events',
        'Toaster',
        'TV',
        'Valley view',
        'Wardrobe',
        'Washer',
        'Waterfront',
        'Wifi',
    ]
}