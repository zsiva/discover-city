const START_PLAYER = 'START_PLAYER';
const ADD_MONEY = 'ADD_MONEY';
const SUBSTRACT_MONEY = 'SUBSTRACT_MONEY';
const SET_NAME = 'SET_NAME';
const SET_LANGUAGE = 'SET_LANGUAGE';

const startPlayer = money => ({ type: START_PLAYER, money });
const addMoney = money => ({ type: ADD_MONEY, money });
const substractMoney = money => ({ type: SUBSTRACT_MONEY, money });
const setName = name => ({ type: SET_NAME, name });
const setLanguage = language => ({ type: SET_LANGUAGE, language });

export {
  startPlayer,
  addMoney,
  substractMoney,
  setName,
  setLanguage,
  START_PLAYER,
  ADD_MONEY,
  SUBSTRACT_MONEY,
  SET_NAME,
  SET_LANGUAGE,
};
