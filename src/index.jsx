import 'whatwg-fetch'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Main from './containers/main'
import Blank from './components/blank'
import rootReducer from './reducers'
import sagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { loadImages, receiveImages } from './actions'
import rootSaga from './sagas'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routeReducer
}))

const reduxRouterMiddleware = syncHistory(browserHistory)

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware(rootSaga),
  reduxRouterMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

store.dispatch(loadImages())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute path="foo" component={Main} />
        <Route path="blank" component={Blank} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
