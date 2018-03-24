import { LOAD_CITY } from '../actions/cities';
import { ITEMS_LOADING, CREATE_LIST } from '../actions/game';

import { CITIES } from '../data/cities.js';

const selectRandom = num => CITIES.sort(() => 0.5 - Math.random()).slice(0, num);

const gameState = (state = [], action) => {
  switch (action.type) {
    case ITEMS_LOADING:
      return { ...state, isLoading: action.isLoading, intro: action.intro };
    case CREATE_LIST:
      let list = selectRandom(action.num);
      return {
        ...state,
        selectedCities: list,
        currentCity: list[0],
        maxCities: action.num - 1,
        currentCityID: 0,
        nextCity: list[1],
      };
    case LOAD_CITY:
      if (state.currentCityID < state.maxCities) {
        state.currentCityID++;
      }
      return {
        ...state,
        currentCity: state.selectedCities[state.currentCityID],
        currentCityID: state.currentCityID,
        nextCity:
          state.currentCityID < state.maxCities
            ? state.selectedCities[state.currentCityID + 1]
            : [],
      };
    default:
      return state;
  }
};

export default gameState;
