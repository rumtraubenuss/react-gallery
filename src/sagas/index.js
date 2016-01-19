import { take, put, call, fork, race } from 'redux-saga'
import { receiveImages } from '../actions'

export function* fetchImages() {
  while(yield take('LOAD_IMAGES')) {
    const response = yield call(fetch, 'http://localhost:8081/api')
    const json = yield response.json()
    yield put(receiveImages(json.items))
  }
}

export default function* root() {
  yield fork(fetchImages)
}
