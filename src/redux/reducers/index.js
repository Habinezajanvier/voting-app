import { combineReducers } from "redux";
import auth from "./login";

// function that contains all reducer objects.
const allReducers = combineReducers({
  auth,
});

export default allReducers;
