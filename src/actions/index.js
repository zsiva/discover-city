export const SELECT_CITY = 'SELECT_CITY';
export const CREATE_LIST = 'CREATE_LIST';
export const ADD_CITY = 'ADD_CITY';

export const selectCity = ( currentCity ) => ({ type: SELECT_CITY, currentCity });
export const addCity = ( city ) => ({ type: ADD_CITY, city });
export const createCityList = ( cities ) => ({ type: CREATE_LIST,  cities });
