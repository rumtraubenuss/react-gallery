import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './containers/main'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { receiveImages } from './actions'
import API from './lib/api'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)
const store = createStoreWithMiddleware(rootReducer)

API.getImages( response => {
  store.dispatch(receiveImages(response.items))
})

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
