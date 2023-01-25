import {orderService} from '../services/order.service.js'
import {store} from './store.js'
import {ADD_ORDER, REMOVE_ORDER, SET_ORDERS} from './order.reducer.js'
import { SET_WATCHED_USER} from './user.reducer.js'

// Action Creators
export function getActionRemoveOrder(orderId) {
    return {type: REMOVE_ORDER, orderId}
    }
export function getActionAddOrder(order) {
    return {type: ADD_ORDER, order}
    }
export function getActionSetWatchedUser(user) {
    return {type: SET_WATCHED_USER, user}
    }

export async function loadOrders(filterBy={}) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch({type: SET_ORDERS, orders})

    } catch (err) {
        console.log('OrderActions: err in loadOrders', err)
        throw err
    }
}

export async function saveOrder(order) {
    try {
        const addedOrder = await orderService.save(order)
        store.dispatch(getActionAddOrder(addedOrder)) 
        //Maybe another action creator for the msg?
    } catch (err) {
        console.log('OrderActions: err in addOrder', err)
        throw err
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch(getActionRemoveOrder(orderId))
    } catch (err) {
        console.log('OrderActions: err in removeOrder', err)
        throw err
    }
}

