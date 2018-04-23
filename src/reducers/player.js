import { START_PLAYER, ADD_MONEY, SUBSTRACT_MONEY, SET_NAME, SET_LANGUAGE, ADD_DATETIME } from '../actions/player';

const player = (state = [], action) => {
  switch (action.type) {
    case START_PLAYER:
      return {
        ...state,
        money: action.money ? action.money : state.money,
      };

    case ADD_MONEY:
      return {
        ...state,
        money: state.money + action.money,
      };
    case SUBSTRACT_MONEY:
      return {
        ...state,
        money: state.money - action.money,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case ADD_DATETIME:
      return {
        ...state,
        dateTime: state.dateTime + action.dateTime,
      };
    default:
      return state;
  }
};

export default player;
