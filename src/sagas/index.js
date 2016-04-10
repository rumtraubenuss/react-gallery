import { take, put, call, fork, race, apply } from 'redux-saga'
import { receiveImages, endDummyTimeoutRedirect, networkChange } from '../actions'
import * as constants from '../constants/'
import { routeActions } from 'redux-simple-router'
import Firebase from 'firebase'
import { startSubmit, stopSubmit } from 'redux-form';

const firebasePath = 'https://popping-fire-3816.firebaseio.com'

export function* fetchImages() {
  while(yield take(constants.LOAD_IMAGES)) {
    const response = yield call(fetch, 'http://localhost:8081/api')
    const json = yield response.json()
    yield put(receiveImages(json.items))
  }
}

export function* dummyTimeoutRedirect() {
  while(true) {
    yield take(constants.TRIGGER_DUMMY_TIMEOUT_REDIRECT)
    const result = yield call(delay, 1000)
    yield put(routeActions.push('/blank'))
    yield put(endDummyTimeoutRedirect())
  }
}

export function* firebaseLogin(action) {
  const firebase = new Firebase(firebasePath)
  while(true) {
    const { email, password, type } = yield take(constants.TRIGGER_LOGIN)
    yield put(startSubmit('login'))
    const { transactionObject } = yield put(networkChange('start'))
    yield firebase.authWithPassword({email, password})
    yield put(stopSubmit('login'))
    yield put(networkChange('stop', transactionObject))
  }
}

export function* firebaseLogout(action) {
  const firebase = new Firebase(firebasePath)
  while(true) {
    yield take(constants.TRIGGER_LOGOUT)
    firebase.unauth()
  }
}

export function* firebasePush(action) {
  let firebase
  while(true) {
    const { path = '/foo/bar', node, formName = '' } = yield take(constants.PUSH_NODE)
    firebase = new Firebase(firebasePath + path)
    const { transactionObject } = yield put(networkChange('start'))
    yield put(startSubmit('push'))
    try {
      const res = yield apply(firebase, firebase.push, [node, (a,b) => null])
    }
    catch(er) {
      console.log('ERROR', er)
    }
    yield put(networkChange('stop', transactionObject))
    yield put(stopSubmit('push'))
  }
}

export default function* root() {
  yield fork(fetchImages)
  yield fork(dummyTimeoutRedirect)
  yield fork(firebaseLogin)
  yield fork(firebaseLogout)
  yield fork(firebasePush)
}

function delay(time) {
  return new Promise( resolve => {
    setTimeout(() => resolve('done'), time)
  })
}
