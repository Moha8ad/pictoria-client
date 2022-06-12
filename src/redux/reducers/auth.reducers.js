import AuthActionTypes from "../constants/auth.types";

export const authReducer = (user = { authData: null }, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGOUT:
      localStorage.clear();
  
      return { ...user, authData: null, loading: false, errors: null };
    case AuthActionTypes.AUTH:      
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return { 
        ...user, authData: action?.payload
      }
   
    default:
      return user;
  }
};

export default authReducer;