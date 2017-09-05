import {fetchJson} from '../utils/fetch';

const LOAD_DATA = 'LOAD_DATA';
const ITEMS_LOADING = 'ITEMS_LOADING';

const itemsAreLoading = (bool) => ({ type: ITEMS_LOADING, isLoading: bool, intro: false});

const loadGameData = (url) => dispatch => {
  dispatch(itemsAreLoading(true));

  return setTimeout(() => {
      dispatch(itemsAreLoading(false));
  }, 2000);
};

export {
  loadGameData,
  LOAD_DATA,
  ITEMS_LOADING
}
