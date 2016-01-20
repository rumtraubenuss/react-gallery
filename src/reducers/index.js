import { combineReducers } from 'redux';
import * as constants from '../constants/'

function images(state = {items: [], selectedItem: undefined}, action) {
  switch(action.type) {
    case constants.RECEIVE_IMAGES:
      return Object.assign({}, state, {items: action.images});
    case constants.SELECT_ITEM:
      return Object.assign({}, state, {selectedItem: action.id})
  }
  return state;
}

const fooApp = combineReducers({
  images
});

export default fooApp;
