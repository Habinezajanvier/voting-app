import axios from "axios";
import {
  SET_ERRORS,
  SET_LOADING,
  SET_POLLS,
  SET_VOTE_LOADING,
  MAKE_VOTE,
  CLEAR_STATES,
  SET_SUCCESS,
  SET_DELETE_SUCCESS,
} from "./types";

export const createPoll = (data) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  axios
    .post(
      "https://voting-app-b1e95-default-rtdb.firebaseio.com/polls.json",
      data
    )
    .then((res) => {
      dispatch({ type: SET_SUCCESS });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: "Something went wrong",
      });
    });
};

export const getAllPoll = () => (dispatch) => {
  axios
    .get("https://voting-app-b1e95-default-rtdb.firebaseio.com/polls.json")
    .then((res) => {
      dispatch({
        type: SET_POLLS,
        payload: { id: Object.keys(res.data), polls: Object.values(res.data) },
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: "Something went Wrong",
      });
    });
};

export const addVote = (id, itemId, score) => (dispatch) => {
  dispatch({ type: SET_VOTE_LOADING });
  axios
    .put(
      `https://voting-app-b1e95-default-rtdb.firebaseio.com/polls/${id}/items/${itemId}/score.json`,
      score
    )
    .then((res) => {
      dispatch({ type: MAKE_VOTE });
    })
    .catch((err) => console.log(err));
};

export const deletePoll = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  axios
    .delete(
      `https://voting-app-b1e95-default-rtdb.firebaseio.com/polls/${id}.json`
    )
    .then((res) => {
      dispatch({ type: SET_DELETE_SUCCESS });
    })
    .catch((err) => console.log(err));
};

export const clearStates = () => (dispatch) => {
  dispatch({ type: CLEAR_STATES });
};
