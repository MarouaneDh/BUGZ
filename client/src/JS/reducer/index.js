import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { bugPostReducer } from "./bugPostReducer";
import { editReducer } from "./editBugPost";
import { userReducer } from "./userReducer";

export default combineReducers({
  authReducer,
  bugPostReducer,
  editReducer,
  userReducer,
});
