import 'whatwg-fetch'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import Main from './containers/main'
import Blank from './components/blank'
import * as reducers from './reducers'
import sagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import { Provider } from 'react-redux'
import { loadImages, receiveImages } from './actions'
import rootSaga from './sagas'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  ...reducers,
  routing: routeReducer,
  form: formReducer,
})

const reduxRouterMiddleware = syncHistory(browserHistory)

const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(
      sagaMiddleware(rootSaga),
      reduxRouterMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

store.dispatch(loadImages())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="blank" component={Blank} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
