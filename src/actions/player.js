const START_PLAYER = 'START_PLAYER';
const ADD_MONEY = 'ADD_MONEY';
const SUBSTRACT_MONEY = 'SUBSTRACT_MONEY';
const SET_NAME = 'SET_NAME';

const startPlayer = money => ({ type: START_PLAYER, money });
const addMoney = money => ({ type: ADD_MONEY, money });
const substractMoney = money => ({ type: SUBSTRACT_MONEY, money });
const setName = name => ({ type: SET_NAME, name });

export {
  startPlayer,
  addMoney,
  substractMoney,
  setName,
  START_PLAYER,
  ADD_MONEY,
  SUBSTRACT_MONEY,
  SET_NAME,
};
