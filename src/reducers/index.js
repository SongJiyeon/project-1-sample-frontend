import { combineReducers } from 'redux';
import * as types from '../actions/index';

const photo = (state = {}, action) => {
  switch(action.type) {
    case types.SET_PHOTO:
      return action.photo;
    default:
      return state;
  };
};

export default combineReducers({
  photo
});
