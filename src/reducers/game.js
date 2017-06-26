import {
  SELECT_CITY,
  CREATE_LIST,
  ADD_CITY
} from '../actions';

import {CITIES} from '../data/cities.js';

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
        nextCity: CITIES.find(city => city.name === action.nextCity)
      })
    default:
      return state;
  }
};

export default gameState;
