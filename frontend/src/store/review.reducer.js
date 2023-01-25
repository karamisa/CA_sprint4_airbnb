export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'

const initialState = {
  reviews: [],
}

export function reviewReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, reviews: action.reviews }
    case ADD_ORDER:
      return { ...state, reviews: [...state.reviews, action.review] }
    case REMOVE_REVIEW:
      return { ...state, reviews: state.reviews.filter(review => review._id !== action.reviewId) }
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.review._id ? action.review : review
        )}
    default:
      return state
  }
}
