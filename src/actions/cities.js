const CREATE_LIST = 'CREATE_LIST';
const LOAD_CITY = 'LOAD_CITY';

const createCityList = ( cities ) => ({ type: CREATE_LIST,  cities });
const loadNextCity = () => ({ type: LOAD_CITY})

export{
  loadNextCity,
  LOAD_CITY,
  CREATE_LIST,
  createCityList
}
