import { combineReducers } from 'redux';
import * as constants from '../constants/'
import { paginate, PREV, NEXT } from '../utils/'

const initialImageState = {
  items: [],
  selectedItem: undefined,
  itemsPaginated: [],
  pageCurrent: 1,
  itemsPerPage: 4
}

function images(state = initialImageState, action) {
  let res
  switch(action.type) {
    case constants.RECEIVE_IMAGES:
      res = paginate(action.images, state.pageCurrent, state.itemsPerPage, state.itemsPaginated)
      return Object.assign({}, state,
        {
          items: action.images,
          itemsPaginated: res.items,
          pageCurrent: res.page
        }
      )
    case constants.SELECT_ITEM:
      // TODO: Calculate considering active page
      return Object.assign({}, state, {selectedItem: action.id})
    case constants.PAGINATE_IMAGES_NEXT:
      res = paginate(state.items, state.pageCurrent, state.itemsPerPage, state.itemsPaginated, NEXT)
      return Object.assign({}, state,
        {
          itemsPaginated: res.items,
          pageCurrent: res.page
        }
      )
    case constants.PAGINATE_IMAGES_PREV:
      res = paginate(state.items, state.pageCurrent, state.itemsPerPage, state.itemsPaginated, PREV)
      return Object.assign({}, state,
        {
          itemsPaginated: res.items,
          pageCurrent: res.page
        }
      )
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
