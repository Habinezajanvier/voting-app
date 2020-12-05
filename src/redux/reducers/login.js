import { SET_ERRORS, SET_LOADING, SET_RESPONSE } from "../actions/types";

const initialState = {
  laoding: null,
  response: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: null,
        error: action.payload,
      };

    case SET_RESPONSE:
      return {
        ...state,
        loading: null,
        response: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
