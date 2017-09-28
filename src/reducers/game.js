import { SELECT_CITY, LOAD_CITY} from '../actions/cities';
import {ITEMS_LOADING, CREATE_LIST} from '../actions/game';

import { CITIES } from '../data/cities.js';

const selectRandom = (num) => CITIES.sort(() => .5 - Math.random()).slice(0, num)

const gameState = (state = [], action) => {
  switch (action.type) {
    case ITEMS_LOADING:
      return {...state, isLoading: action.isLoading, intro: action.intro }
    case CREATE_LIST:
      let list = selectRandom(action.num);
      return {...state, selectedCities : list, currentCity: list[0], maxCities: action.num }
    case LOAD_CITY:
      if(state.currentCityID < state.maxCities - 1){
        state.currentCityID++;
      console.log('loading next', state.currentCityID, state.maxCities);
      }

      return {...state, currentCity: state.selectedCities[state.currentCityID], currentCityID: state.currentCityID}
    default:
      return state;
  }
};

export default gameState;
