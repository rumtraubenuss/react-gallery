import { take, put, call, fork, race } from 'redux-saga'
import { receiveImages, endDummyTimeoutRedirect } from '../actions'
import * as constants from '../constants/'
import { routeActions } from 'redux-simple-router'
import Firebase from 'firebase'

const firebase = new Firebase('https://popping-fire-3816.firebaseio.com')

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

export function* firebaseLogin(action) {
  while(true) {
    const { email, password, type } = yield take(constants.TRIGGER_LOGIN)
    console.log(firebase.authWithPassword({email, password}))
    //const res = yield call(firebase.authWithPassword, {email: email, password: password})
    //console.log('SAGA LOGIN TRIGGERED', email, password, type)
  }
}

export default function* root() {
  yield fork(fetchImages)
  yield fork(dummyTimeoutRedirect)
  yield fork(firebaseLogin)
}

function delay(time) {
  return new Promise( resolve => {
    setTimeout(() => resolve('done'), time)
  })
}
