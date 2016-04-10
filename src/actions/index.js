import * as constants from '../constants/'
import { NEXT } from '../utils/'

export function receiveImages(images) {
  return {
    type: constants.RECEIVE_IMAGES,
    images: images
  }
}

export function loadImages() {
  return {
    type: constants.LOAD_IMAGES
  }
}

export function triggerDummyTimeoutRedirect() {
  return {
    type: constants.TRIGGER_DUMMY_TIMEOUT_REDIRECT
  }
}

export function endDummyTimeoutRedirect() {
  return {
    type: constants.END_DUMMY_TIMEOUT_REDIRECT
  }
}

export function paginateImages(direction) {
  return {
    type: direction === NEXT ? constants.PAGINATE_IMAGES_NEXT : constants.PAGINATE_IMAGES_PREV
  }
}

export function selectItem(id) {
  return {
    type: constants.SELECT_ITEM,
    id: id
  }
}

export function triggerLogin(email, password) {
  return {
    type: constants.TRIGGER_LOGIN,
    email,
    password,
  }
}

export function triggerLogout() {
  return {
    type: constants.TRIGGER_LOGOUT,
  }
}

export function authChange(uid) {
  return {
    type: constants.AUTH_CHANGE,
    uid
  }
}

export function pushNode(node) {
  return {
    type: constants.PUSH_NODE,
    node
  }
}

export function networkChange(status, transactionObject = {}) {
  const type = status == 'start' ? constants.NETWORK_SYNC_START : constants.NETWORK_SYNC_STOP
  return {
    type,
    transactionObject
  }
}

