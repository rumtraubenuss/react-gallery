import { combineReducers } from 'redux';
import * as constants from '../constants/'

const initialImageState = {
  items: [],
  selectedItem: undefined,
  itemsPaginated: [],
  pageCurrent: 1,
  itemsPerPage: 2
}

function paginate(items, page, itemsPerPage=2) {
  return items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
}

function images(state = initialImageState, action) {
  switch(action.type) {
    case constants.RECEIVE_IMAGES:
      return Object.assign({}, state,
        {
          items: action.images,
          itemsPaginated: paginate(action.images, state.pageCurrent, state.itemsPerPage)
        }
      )
    case constants.SELECT_ITEM:
      return Object.assign({}, state, {selectedItem: action.id})
    case constants.PAGINATE_IMAGES_NEXT:
      return Object.assign({}, state,
        {
          itemsPaginated: paginate(state.items, state.pageCurrent + 1, state.itemsPerPage),
          pageCurrent: state.pageCurrent + 1
        }
      )
    case constants.PAGINATE_IMAGES_PREV:
      return Object.assign({}, state,
        {
          itemsPaginated: paginate(state.items, state.pageCurrent - 1, state.itemsPerPage),
          pageCurrent: state.pageCurrent - 1
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
