import axios from "axios";
import { firebaseConfig } from "../../firebase/config";
import { SET_AUTH_ERRORS, SET_AUTH_LOADING, SET_AUTH_SUCCESS } from "./types";

const { apiKey } = firebaseConfig;

export const signup = (data) => (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      { ...data, returnSecureToken: true }
    )
    .then((res) => {
      localStorage.setItem("authToken", res.data.idToken);
      dispatch({ type: SET_AUTH_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_AUTH_ERRORS,
        payload: "Something went wrong, try again",
      });
    });
};
export const login = (data) => (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      { ...data, returnSecureToken: true }
    )
    .then((res) => {
      localStorage.setItem("authToken", res.data.idToken);
      dispatch({ type: SET_AUTH_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_AUTH_ERRORS,
        payload: "Something went wrong, try again",
      });
    });
};
