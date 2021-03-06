import {
  SET_AUTH_ERRORS,
  SET_AUTH_LOADING,
  SET_AUTH_SUCCESS,
  CLEAR_STATES,
  LOG_USER_OUT,
} from "../actions/types";

const initialState = {
  loading: null,
  authSuccess: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_AUTH_ERRORS:
      return {
        ...state,
        loading: null,
        error: action.payload,
      };

    case SET_AUTH_SUCCESS:
      return {
        ...state,
        loading: null,
        authSuccess: true,
        token: action.payload.idToken,
      };
    case LOG_USER_OUT:
      return {
        ...state,
        authSuccess: null,
        token: null,
      };
    case CLEAR_STATES:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
};

export default authReducer;
