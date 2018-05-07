const CREATE_PLAYER = 'CREATE_PLAYER';
const ADD_MONEY = 'ADD_MONEY';
const SUBSTRACT_MONEY = 'SUBSTRACT_MONEY';
const SET_NAME = 'SET_NAME';
const SET_LANGUAGE = 'SET_LANGUAGE';
const ADD_DATETIME = 'ADD_DATETIME';

const createPlayer = player => ({ type: CREATE_PLAYER, player });
const addMoney = money => ({ type: ADD_MONEY, money });
const substractMoney = money => ({ type: SUBSTRACT_MONEY, money });
const setName = name => ({ type: SET_NAME, name });
const setLanguage = language => ({ type: SET_LANGUAGE, language });
const addDateTime = dateTime => ({ type: ADD_DATETIME, dateTime });

export {
  createPlayer,
  addMoney,
  substractMoney,
  setName,
  setLanguage,
  addDateTime,
  CREATE_PLAYER,
  ADD_MONEY,
  SUBSTRACT_MONEY,
  SET_NAME,
  SET_LANGUAGE,
  ADD_DATETIME,
};
