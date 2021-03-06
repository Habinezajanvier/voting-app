import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwtDecode from "jwt-decode";
import { SET_AUTH_SUCCESS, LOG_USER_OUT } from "./redux/actions/types";

const token = localStorage.getItem("authToken");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("authToken");
    store.dispatch({ type: LOG_USER_OUT });
  } else {
    store.dispatch({ type: SET_AUTH_SUCCESS, payload: { idToken: token } });
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
