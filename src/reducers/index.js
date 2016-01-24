import { combineReducers } from 'redux';
import * as constants from '../constants/'

const initialImageState = {
  items: [],
  selectedItem: undefined,
  itemsPaginated: [],
  pageCurrent: 1,
  itemsPerPage: 2
}

function paginate(items, page, itemsPerPage=2, itemsPaginatedCurrent) {
  if(page < 1 || !(Math.floor(page * itemsPerPage) <= items.length)) {
    return {itemsPaginatedCurrent, page}
  } else {
    return {
      items: items.slice((page - 1) * itemsPerPage, page * itemsPerPage),
      page
    }
  }
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
      return Object.assign({}, state, {selectedItem: action.id})
    case constants.PAGINATE_IMAGES_NEXT:
      res = paginate(state.items, state.pageCurrent + 1, state.itemsPerPage, state.itemsPaginated)
      return Object.assign({}, state,
        {
          itemsPaginated: res.items,
          pageCurrent: res.page
        }
      )
    case constants.PAGINATE_IMAGES_PREV:
      res = paginate(state.items, state.pageCurrent - 1, state.itemsPerPage, state.itemsPaginated)
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
