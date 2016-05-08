import { take, put, call, fork, apply } from 'redux-saga/effects';
import { receiveImages, endDummyTimeoutRedirect, networkChange } from '../actions';
import * as constants from '../constants/';
import { routeActions } from 'redux-simple-router';
import Firebase from 'firebase';
import { startSubmit, stopSubmit } from 'redux-form';

const firebasePath = 'https://popping-fire-3816.firebaseio.com';

export function* fetchImages() {
  for (;;) {
    yield take(constants.LOAD_IMAGES);
    const response = yield call(fetch, 'http://localhost:8081/api');
    const json = yield response.json();
    yield put(receiveImages(json.items));
  }
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve('done'), time);
  });
}

export function* dummyTimeoutRedirect() {
  for (;;) {
    yield take(constants.TRIGGER_DUMMY_TIMEOUT_REDIRECT);
    yield call(delay, 1000);
    yield put(routeActions.push('/blank'));
    yield put(endDummyTimeoutRedirect());
  }
}

export function* firebaseLogin() {
  const firebase = new Firebase(firebasePath);
  for (;;) {
    const { email, password } = yield take(constants.TRIGGER_LOGIN);
    yield put(startSubmit('login'));
    const { transactionObject } = yield put(networkChange('start'));
    yield firebase.authWithPassword({ email, password });
    yield put(stopSubmit('login'));
    yield put(networkChange('stop', transactionObject));
  }
}

export function* firebaseLogout() {
  const firebase = new Firebase(firebasePath);
  for (;;) {
    yield take(constants.TRIGGER_LOGOUT);
    firebase.unauth();
  }
}

export function* firebasePush() {
  let firebase;
  for (;;) {
    const { node, val } = yield take(constants.PUSH_NODE);
    firebase = new Firebase(firebasePath + node);
    const { transactionObject } = yield put(networkChange('start'));
    yield put(startSubmit('push'));
    try {
      yield apply(firebase, firebase.push, [val]);
    } catch (er) {
      // console.log('ERROR', er);
    }
    yield put(networkChange('stop', transactionObject));
    yield put(stopSubmit('push'));
  }
}

export default function* root() {
  yield [
    fork(fetchImages),
    fork(dummyTimeoutRedirect),
    fork(firebaseLogin),
    fork(firebaseLogout),
    fork(firebasePush),
  ];
}
