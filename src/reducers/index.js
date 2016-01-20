import { combineReducers } from 'redux';
import * as constants from '../constants/'

function images(state = [], action) {
  switch(action.type) {
    case constants.RECEIVE_IMAGES:
      return action.images;
  }
  return state;
}

const fooApp = combineReducers({
  images
});

export default fooApp;
