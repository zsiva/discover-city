import { START_PLAYER, ADD_MONEY, SUBSTRACT_MONEY, SET_NAME } from '../actions/player';

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
    default:
      return state;
  }
};

export default player;
