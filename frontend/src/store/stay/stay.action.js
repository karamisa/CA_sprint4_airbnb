import { stayService } from '../../services/stay.service.js';
import { store } from '../store.js';
import {
  REMOVE_STAYS,
  SAVE_STAYS,
  SET_STAYS,
  UPDATE_STAYS,
  SET_LABELS,
  SET_IS_LOADING,
} from './stayReducer';

//  Load stays
export function loadStays(filterBy, sortBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  return stayService
    .query(filterBy, sortBy)
    .then((stays) => {
      // console.log('got from server', stays);
      // we get object with total pages and stay array
      store.dispatch({ type: SET_STAYS, stays: stays.stays });
      store.dispatch({ type: SET_LABELS, labels: stays.labels });
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
