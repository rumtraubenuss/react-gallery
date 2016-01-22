import 'whatwg-fetch'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './containers/main'
import Blank from './components/blank'
import rootReducer from './reducers'
import sagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { loadImages, receiveImages } from './actions'
import rootSaga from './sagas'

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware(rootSaga)
)(createStore)
const store = createStoreWithMiddleware(rootReducer)

store.dispatch(loadImages())

ReactDOM.render(
  <Provider store={store}>
    <Blank />
  </Provider>,
  document.getElementById('app')
)
