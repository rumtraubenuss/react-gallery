import 'whatwg-fetch'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './containers/main'
import rootReducer from './reducers'
import sagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { loadImages, receiveImages } from './actions'
import API from './lib/api'
import rootSaga from './sagas'

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware(rootSaga)
)(createStore)
const store = createStoreWithMiddleware(rootReducer)

store.dispatch(loadImages())

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
