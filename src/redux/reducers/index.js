import { combineReducers } from "redux";
import auth from "./auth";
import polls from "./polls";
import votes from "./votes";

// function that contains all reducer objects.
const allReducers = combineReducers({
  auth,
  polls,
  voting: votes,
});

export default allReducers;
