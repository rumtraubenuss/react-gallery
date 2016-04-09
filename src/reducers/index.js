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

export function images(state = initialImageState, action) {
  switch(action.type) {
    case constants.RECEIVE_IMAGES:{
      const imageObjects = action.images.map( (image, index) => { return  {image:image, id: index} })
      let res = paginate(imageObjects, state.pageCurrent, state.itemsPerPage, state.itemsPaginated)
      return ({
        ...state,
        items: imageObjects,
        itemsPaginated: res.items,
        pageCurrent: res.page,
      })
    }
    case constants.SELECT_ITEM:{
      return { ...state, selectedItem: action.id }
    }
    case constants.PAGINATE_IMAGES_NEXT:{
      let res = paginate(state.items, state.pageCurrent, state.itemsPerPage, state.itemsPaginated, NEXT)
      return ({
        ...state,
        itemsPaginated: res.items,
        pageCurrent: res.page
      })
    }
    case constants.PAGINATE_IMAGES_PREV:{
      let res = paginate(state.items, state.pageCurrent, state.itemsPerPage, state.itemsPaginated, PREV)
      return ({
        ...state,
        itemsPaginated: res.items,
        pageCurrent: res.page,
      })
    }
  }
  return state
}

export function user(state = { loggedIn: undefined }, action) {
  switch(action.type) {
    case constants.AUTH_CHANGE: {
      if(action.status === true){
        return { ...state, loggedIn: true }
      }
      return { ...state, loggedIn: false }
    }
  }
  return state
}

export function network(state = {busy: false, transactionQueue: []}, action) {
  switch(action.type) {
    case constants.NETWORK_SYNC_START: {
      return { ...state, busy: true, transactionQueue:[...state.transactionQueue, action.transactionObject] }
    }
    case constants.NETWORK_SYNC_STOP: {
      const transactionQueue = state.transactionQueue.filter(obj => obj !== action.transactionObject)
      const busy = transactionQueue.length > 0
      return { ...state, busy, transactionQueue }
    }
  }
  return state
}

export function dummy(state = {}, action) {
  switch(action.type) {
    case constants.END_DUMMY_TIMEOUT_REDIRECT:
      console.log('received end timeout')
      return state
  }
  return state
}

