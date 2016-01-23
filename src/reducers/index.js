import { combineReducers } from 'redux';
import * as constants from '../constants/'

function images(state = {items: [], selectedItem: undefined}, action) {
  switch(action.type) {
    case constants.RECEIVE_IMAGES:
      return Object.assign({}, state, {items: action.images});
    case constants.SELECT_ITEM:
      return Object.assign({}, state, {selectedItem: action.id})
  }
  return state
}

function dummy(state = {}, action) {
  switch(action.type) {
    case constants.END_DUMMY_TIMEOUT_REDIRECT:
      console.log('received end timeout')
      return state
  }
  return state
}

const fooApp = combineReducers({
  images,
  dummy
});

export default fooApp;
