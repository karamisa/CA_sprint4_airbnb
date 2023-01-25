import { httpService } from './http.service'


export const reviewService = {
    query,
    save,
    remove,
    getById,
    getEmptyOrder
}

function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?hostId=${filterBy.hostId}&buyId=${filterBy.hostId}&stayId=${filterBy.stayId}`
    return httpService.get(`review${queryStr}`)
}

function getById(orderId){
    return httpService.get(`order/${orderId}`)
}

function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

function save(order) {
    if (order._id) {
        return httpService.put(`order/${order._id}`, order)
    } else {
        return httpService.post(`order`, order)
    }
}

function getEmptyOrder(
    startDate = null,
    endDate = null,
    guests = { adults: 0, kids: 0, infants: 0, pets: 0 },
    stay = { _id: null, name: null }
) {
    return {
      hostId: null,
      buyer: null,
      totalPrice: 0,
      startDate,
      endDate,
      guests,
      stay,
      msgs: [],
      status: 'pending',
    }
  }




