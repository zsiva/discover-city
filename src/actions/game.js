const LOAD_DATA = 'LOAD_DATA';
const ITEMS_LOADING = 'ITEMS_LOADING';
const CREATE_LIST = 'CREATE_LIST';
const GET_USERS = 'GET_USERS';

const itemsAreLoading = bool => ({ type: ITEMS_LOADING, isLoading: bool, intro: false });
const createCityList = numCities => ({ type: CREATE_LIST, num: numCities });
const getUsers = users => ({ type: GET_USERS, users });

const loadGameData = url => dispatch => {
  dispatch(itemsAreLoading(true));

  return setTimeout(() => {
    dispatch(createCityList(6));
    dispatch(itemsAreLoading(false));
  }, 1000);
};

export { loadGameData, LOAD_DATA, ITEMS_LOADING, CREATE_LIST, getUsers, GET_USERS };
