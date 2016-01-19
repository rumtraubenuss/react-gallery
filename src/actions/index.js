export const RECEIVE_IMAGES = 'RECEIVE_IMAGES'
export function receiveImages(images) {
  return {
    type: RECEIVE_IMAGES,
    images: images
  }
}

export const LOAD_IMAGES = 'LOAD_IMAGES'
export function loadImages() {
  return {
    type: LOAD_IMAGES
  }
}
