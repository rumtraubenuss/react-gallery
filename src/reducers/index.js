import { combineReducers } from 'redux';
import * as constants from '../constants/'

const initialImageState = {
  items: [],
  selectedItem: undefined,
  itemsPaginated: [],
  pageCurrent: 1,
  itemsPerPage: 4
}

function paginate(items, pageCurrent, itemsPerPage, itemsPaginatedCurrent, direction=undefined) {
  if(typeof direction != 'undefined') {
    const cond_a = pageCurrent <= 1 && direction === 'prev'
    const cond_b = pageCurrent * itemsPerPage >= items.length && direction === 'next'
    if(cond_a || cond_b) {
      return {
        items: itemsPaginatedCurrent,
        page: pageCurrent
      }
    }
  }
  let newPage = pageCurrent
  if(direction === 'next') newPage += 1
  if(direction === 'prev') newPage -= 1
  return {
    items: items.slice((newPage - 1) * itemsPerPage, newPage * itemsPerPage),
    page: newPage
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
      res = paginate(state.items, state.pageCurrent, state.itemsPerPage, state.itemsPaginated, 'next')
      return Object.assign({}, state,
        {
          itemsPaginated: res.items,
          pageCurrent: res.page
        }
      )
    case constants.PAGINATE_IMAGES_PREV:
      res = paginate(state.items, state.pageCurrent, state.itemsPerPage, state.itemsPaginated, 'prev')
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
