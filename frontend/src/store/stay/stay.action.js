import { useParams } from 'react-router-dom';
import { stayService } from '../../services/stay.service.local.js';
import { userService } from '../../services/user.service.local.js';
import { store } from '../store.js';
import { SET_USER } from '../user.reducer.js';

import {
  REMOVE_STAYS,
  SAVE_STAYS,
  SET_STAYS,
  UPDATE_STAYS,
  SET_IS_LOADING,
} from './stay.reducer';

//  Load stays
export function loadStays(filterBy={},sortBy={}) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  return stayService
    .query(filterBy, sortBy)
    .then((stays) => {
      // console.log('in stay action got from server', stays);
      // we get object with total pages and stay array
      store.dispatch({ type: SET_STAYS, stays: stays });
      // store.dispatch({ type: SET_LABELS, labels: stays.labels });
    })
    .catch((err) => {
      console.log('Had issues loading stays: ', err);
      throw err;
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    });
}

// Save stay
export function saveStay(stay) {
  const type = stay._id ? UPDATE_STAYS : SAVE_STAYS;
  return stayService
    .save(stay)
    .then((savedStay) => {
      store.dispatch({ type, stay: savedStay });
      return savedStay;
    })
    .catch((err) => {
      console.error(`Cannot save stay: `, err);
      throw err;
    });
}

// Delete stay
export function removeStay(stayId) {
  return stayService
    .remove(stayId)
    .then(() => {
      store.dispatch({ type: REMOVE_STAYS, stayId });
    })
    .catch((err) => {
      console.log('Cannot delete stay: ', err);
      throw err;
    });
}


export async function likeStay(stayId){
  try {
    const user = userService.getLoggedinUser()
    const stay = await stayService.getById(stayId)
    const likedByUser = stay.likedByUsers.filter(miniUser => miniUser._id === user._id)
    stay.likedByUsers = likedByUser.length ? stay.likedByUsers.filter(miniUser => miniUser._id !== user._id) : [...stay.likedByUsers, user]
    saveStay(stay)
    return stay
} catch (err) {
    console.log('CarActions: err in toggling likeStay', err)
    throw err
}
}

