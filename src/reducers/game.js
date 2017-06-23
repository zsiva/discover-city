import {
  SELECT_CITY,
  CREATE_LIST,
  ADD_CITY
} from '../actions';

const gameState = (state = [], action) => {
  switch (action.type) {
    case ADD_CITY:
      return Object.assign({}, state, {
        cities: [
          ...state.cities,
          action.city
        ]
      })
    case SELECT_CITY:
      return Object.assign({}, state, {
        currentCity: action.currentCity
      })
    default:
      return state;
  }
};

export default gameState;
