import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
_createUsers()

export const userService = {
    get,
    remove,
    signup,
    login,
    logout,
    getUsers,
    getEmptyCredentials,
    getLoggedinUser,
}

function get(userId) {
    return storageService.get(USER_KEY, userId)
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

async function signup(credentials) {
    if (!credentials.imgUrl) credentials.imgUrl = 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3'
    const user = await storageService.post(USER_KEY, credentials)
    _saveLoggedinUser(user)
    return user
}

async function login(credentials) {
    const users = await storageService.query(USER_KEY)
    const user = users.find(u => u.username === credentials.username)
    if (!user)
        return Promise.reject('Login failed')
    _saveLoggedinUser(user)
    return user
}

function getUsers() {
    return storageService.query(USER_KEY)
}

function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

function logout() {
    sessionStorage.removeItem('loggedinUser')
    return Promise.resolve()
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
}


function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY)
    if (!users || !users.length) {
        const users = [
            {
              "_id": "u101",
              "fullname": "Muki Host",
              "imgUrl": "https://robohash.org/mukihost",
              "username": "host",
              "password": "secret",
              "isOwner": true // OPTIONAL
            },
            {
              "_id": "u102",
              "fullname": "Puki guest",
              "imgUrl": "https://robohash.org/pukiguest",
              "username": "guest",
              "password": "secret",
            }
          ]

        utilService.saveToStorage(USER_KEY, JSON.parse(JSON.stringify(users)))
    }
}
