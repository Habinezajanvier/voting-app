import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
