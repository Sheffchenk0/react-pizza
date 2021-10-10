import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import homeReducer from './home-reducer';
const store = createStore(
  combineReducers({
    home: homeReducer,
  }),
  applyMiddleware(thunkMiddleware),
);

export default store;
