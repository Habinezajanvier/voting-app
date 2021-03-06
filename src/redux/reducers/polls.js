import {
  SET_ERRORS,
  SET_LOADING,
  SET_POLLS,
  SET_SUCCESS,
  SET_DELETE_SUCCESS,
  CLEAR_STATES,
} from "../actions/types";

const initialState = {
  image: null,
  loading: null,
  polls: [],
  pollIds: [],
  errors: null,
  success: false,
  deleteSuccess: false,
};

const createPollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_POLLS:
      return {
        ...state,
        loading: null,
        polls: action.payload.polls,
        pollIds: action.payload.id,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: null,
        errors: state.payload,
      };

    case SET_SUCCESS:
      return {
        ...state,
        loading: null,
        success: true,
      };

    case SET_DELETE_SUCCESS:
      return {
        ...state,
        loading: null,
        deleteSuccess: true,
      };

    case CLEAR_STATES:
      return {
        ...state,
        loading: null,
        deleteSuccess: false,
      };

    default:
      return state;
  }
};

export default createPollReducer;
