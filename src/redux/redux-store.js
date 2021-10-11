import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import homeReducer from './home-reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    home: homeReducer,
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

window.store = store;

export default store;
