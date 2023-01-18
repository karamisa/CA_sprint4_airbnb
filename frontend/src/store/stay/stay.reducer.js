export const SET_STAYS = 'SET_STAYS';
export const SAVE_STAYS = 'SAVE_STAYS';
export const UPDATE_STAYS = 'UPDATE_STAYS';
export const REMOVE_STAYS = 'REMOVE_STAYS';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_LABELS = 'SET_LABELS';

const initialState = {
  stays: [],
  labels: [],
  isLoading: false,
};

export function stayReducer(state = initialState, action) {
  let stays = [];

  switch (action.type) {
    case SET_STAYS:
      return { ...state, stays: action.stays };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SAVE_STAYS:
      return { ...state, stays: [...state.stays, action.stay] };
    case UPDATE_STAYS:
      stays = state.stays.map((stay) =>
        stay._id === action.stay._id ? action.stay : stay
      );
      return { ...state, stays };
    case REMOVE_STAYS:
      stays = state.stays.filter((stay) => stay._id !== action.stayId);
      return { ...state, stays };
    case SET_LABELS:
      return { ...state, labels: action.labels };
    default:
      return { ...state };
  }
}
