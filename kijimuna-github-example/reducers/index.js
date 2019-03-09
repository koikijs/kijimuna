import { combineReducers } from "redux";
import user from "./user";
import group from "./group";
import token from "./token";
import ws from "./ws";

export default combineReducers({
  user,
  group,
  token,
  ws
});
