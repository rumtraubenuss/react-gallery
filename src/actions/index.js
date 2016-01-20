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
