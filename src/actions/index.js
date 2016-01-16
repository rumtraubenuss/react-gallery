export const RECEIVE_IMAGES = 'RECEIVE_IMAGES'
export function receiveImages(images) {
  return {
    type: RECEIVE_IMAGES,
    images: images
  }
}
