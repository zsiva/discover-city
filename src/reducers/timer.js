import {START_TIMER, STOP_TIMER, RESUME_TIMER, TICK } from '../actions/timer';

 const timer = (state = [], action) => {
   switch (action.type) {
     case START_TIMER:
       return {
         ...state,
         isOn: true,
         time: action.time ? action.time : 30,
         interval: action.interval
       };

     case STOP_TIMER:
       return {
         ...state,
         isOn: false,
         time: state.time,
         interval: null
       };

     case RESUME_TIMER:
       return {
         ...state,
         isOn: true,
         time: state.time
       };

     case TICK:
      if(state.time > 0) {
        return {...state, time: state.time - 1}
      } else {
        return {...state, time: 0, gameEnded: true}
      }
      return {
         ...state,
         time: state.time - 1
       };

     default:
       return state;
   }
 }
export default timer;
