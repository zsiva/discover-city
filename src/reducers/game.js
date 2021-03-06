import { LOAD_CITY } from '../actions/cities';
import { ITEMS_LOADING, CREATE_LIST, GET_USERS } from '../actions/game';
import { shuffleArray } from '../utils/operations';

import { CITIES } from '../data/cities.js';

const cityNames = CITIES.map(city => city.name);

const addCityOptions = (currentCity, prevCity) => [
  ...cityNames.filter(option => option !== currentCity && option !== prevCity).slice(0, 2),
  currentCity,
];

const gameCities = shuffleArray(CITIES).map((city, index, cityArray) =>
  Object.assign(city, {
    cityOptions: shuffleArray(
      addCityOptions(city.name, index > 0 ? cityArray[index - 1].name : city.name),
    ),
  }),
);

const gameState = (state = [], action) => {
  switch (action.type) {
    case ITEMS_LOADING:
      return { ...state, isLoading: action.isLoading, intro: action.intro };
    case CREATE_LIST:
      let list = gameCities.slice(0, action.num);
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
        const currentID = state.currentCityID + 1;

        return {
          ...state,
          currentCity: state.selectedCities[currentID],
          currentCityID: currentID,
          nextCity: state.selectedCities[currentID + 1],
        };
      }
      return state;
    case GET_USERS:
      return {
        ...state,
        usersList: action.users,
      };
    default:
      return state;
  }
};

export default gameState;
