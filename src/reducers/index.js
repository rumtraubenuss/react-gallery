import { combineReducers } from 'redux';
import { RECEIVE_IMAGES } from '../actions';

function images(state = [], action) {
  switch(action.type) {
    case RECEIVE_IMAGES:
      return action.images;
  }
  return state;
}

const fooApp = combineReducers({
  images
});

export default fooApp;
