import * as constants from '../constants/'

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

export function selectItem(id) {
  return {
    type: constants.SELECT_ITEM,
    id: id
  }
}
