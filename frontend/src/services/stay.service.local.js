import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay
}

async function query(){
    const stays = await storageService.query(STORAGE_KEY)
    return stays
}

async function getById(stayId){
    const stay = await storageService.get(STORAGE_KEY, stayId)
    return stay
}

async function save(stay){
    if (stay._id) {
        return storageService.put(STORAGE_KEY, stay)
    } else {
        return storageService.post(STORAGE_KEY, stay)
    }
}

async function remove(stayId){
    return storageService.remove(STORAGE_KEY, stayId)
}

function getEmptyStay(){
    return {
        _id: utilService.makeId(),
        name: '',
    }
}

