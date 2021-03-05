import { SET_VOTE_LOADING, MAKE_VOTE, CLEAR_STATES } from "../actions/types";
const initialState = {
  loading: false,
  voted: false,
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VOTE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MAKE_VOTE:
      return {
        ...state,
        loading: false,
        voted: true,
      };
    case CLEAR_STATES:
      return {
        ...state,
        loading: false,
        voted: false,
      };

    default:
      return state;
  }
};

export default voteReducer;
