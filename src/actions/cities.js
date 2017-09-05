export const SELECT_CITY = 'SELECT_CITY';
export const CREATE_LIST = 'CREATE_LIST';
export const ADD_CITY = 'ADD_CITY';
export const GET_NEXT_CITY = 'GET_NEXT_CITY';

export const selectCity = ( nextCity ) => ({ type: SELECT_CITY, nextCity });
export const addCity = ( city ) => ({ type: ADD_CITY, city });
export const createCityList = ( cities ) => ({ type: CREATE_LIST,  cities });
export const nextCity = ( ) => ({ type: GET_NEXT_CITY });
