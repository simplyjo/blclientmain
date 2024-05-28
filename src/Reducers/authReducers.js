

import { START_LOADING, END_LOADING } from "../constants";
// import Cookies from "js-cookie"



const authReducers = (state = { Auth: false, isLoading: false }, action) => {
  switch (action.type) {

    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default authReducers;
