import { CHECK_WL_FAILURE, CHECK_WL_SUCCESS } from "../constants";


let userData = {};

const userReducers = (state = {   user:[], rewards:[], wl:false, message:'', checked:false }, action) => {
  switch (action.type) {
    
    case CHECK_WL_SUCCESS:
    
    return { ...state, wl:true  };
    case CHECK_WL_FAILURE:
    
    return { ...state, wl:false, checked:true  };

    default:
      return state;
  }
};

export default userReducers;