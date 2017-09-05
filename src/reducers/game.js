import {
  SELECT_CITY,
  GET_NEXT_CITY,
  ADD_CITY
} from '../actions/cities';

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
    case GET_NEXT_CITY:
      return Object.assign({}, state, {
        nextCity: CITIES.find(city => city.name === action.nextCity)
      })
    default:
      return state;
  }
};

export default gameState;
