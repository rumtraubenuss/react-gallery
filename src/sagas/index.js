import { take, put, call, fork, race } from 'redux-saga'
import { receiveImages, endDummyTimeoutRedirect } from '../actions'
import * as constants from '../constants/'
import { routeActions } from 'redux-simple-router'

export function* fetchImages() {
  while(yield take(constants.LOAD_IMAGES)) {
    const response = yield call(fetch, 'http://localhost:8081/api')
    const json = yield response.json()
    yield put(receiveImages(json.items))
  }
}

export function* dummyTimeoutRedirect() {
  while(yield take(constants.TRIGGER_DUMMY_TIMEOUT_REDIRECT)) {
    const result = yield call(delay, 1000)
    yield put(routeActions.push('/blank'))
    yield put(endDummyTimeoutRedirect())
  }
}

export default function* root() {
  yield fork(fetchImages)
  yield fork(dummyTimeoutRedirect)
}

function delay(time) {
  return new Promise( resolve => {
    setTimeout(() => resolve('done'), time)
  })
}
