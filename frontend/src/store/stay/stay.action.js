import { stayService } from '../../services/stay.service.local.js'
import { userService } from '../../services/user.service.local.js'
import { store } from '../store.js'
import { SET_USER } from '../user.reducer.js'

import {
  REMOVE_STAYS,
  SAVE_STAYS,
  SET_STAYS,
  TOGGLE_LIKE_STAY,
  SET_IS_LOADING,
  UNDO_TOGGLE_LIKE_STAY,
  UPDATE_STAYS
} from './stay.reducer'

//  Load stays
export async function loadStays(filterBy={},sortBy={}) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    try {
      const stays = await stayService
        .query(filterBy, sortBy)
      // console.log('in stay action got from server', stays)
      // we get object with total pages and stay array
      store.dispatch({ type: SET_STAYS, stays: stays })
    } catch (err) {
      console.log('Had issues loading stays: ', err)
      throw err
    }
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

// Save stay
export async function saveStay(stay) {
  const type = stay._id ? UPDATE_STAYS : SAVE_STAYS
  try {
    const savedStay = await stayService
      .save(stay)
    store.dispatch({ type, stay: savedStay })
    return savedStay
  } catch (err) {
    console.error(`Cannot save stay: `, err)
    throw err
  }
}

// Delete stay
export async function removeStay(stayId) {
  try {
    await stayService
      .remove(stayId)
    store.dispatch({ type: REMOVE_STAYS, stayId })
  } catch (err) {
    console.log('Cannot delete stay: ', err)
    throw err
  }
}


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export async function onLikeStayOptimistic(stayId) {
  const user = userService.getLoggedinUser()
  store.dispatch({ type: TOGGLE_LIKE_STAY, stayId, user})
  try {
    const stay = await stayService.getById(stayId)
    const likedByUser = stay.likedByUsers.filter(miniUser => miniUser._id === user._id)
    stay.likedByUsers = likedByUser.length ? stay.likedByUsers.filter(miniUser => miniUser._id !== user._id) : [...stay.likedByUsers, user]
    await stayService.save(stay)
  } catch (err) {
    console.log('Cannot update stay', err)
    store.dispatch({
      type: UNDO_TOGGLE_LIKE_STAY,
    })
  }
}


