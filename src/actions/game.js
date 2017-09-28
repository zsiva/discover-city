const LOAD_DATA = 'LOAD_DATA';
const ITEMS_LOADING = 'ITEMS_LOADING';
const CREATE_LIST = 'CREATE_LIST';

const itemsAreLoading = (bool) => ({ type: ITEMS_LOADING, isLoading: bool, intro: false});
const createCityList = (numCities) => ({ type: CREATE_LIST, num: numCities })

const loadGameData = (url) => dispatch => {
  dispatch(itemsAreLoading(true));

  return setTimeout(() => {
      dispatch(createCityList(5));
      dispatch(itemsAreLoading(false));

  }, 2000);
};

export {
  loadGameData,
  LOAD_DATA,
  ITEMS_LOADING,
  CREATE_LIST
}
