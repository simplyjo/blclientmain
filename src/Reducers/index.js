import { combineReducers } from "redux";
import auth from "./authReducers";
import users from "./userReducers"


const reducers = combineReducers({
   auth, users
})

export default reducers