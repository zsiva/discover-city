export const SELECT_CITY = 'SELECT_CITY';
const CREATE_LIST = 'CREATE_LIST';
const LOAD_CITY = 'LOAD_CITY';

export const selectCity = ( nextCity ) => ({ type: SELECT_CITY, nextCity });
const createCityList = ( cities ) => ({ type: CREATE_LIST,  cities });
const loadNextCity = () => ({ type: LOAD_CITY})

export{
  loadNextCity,
  LOAD_CITY,
  CREATE_LIST,
  createCityList
}
