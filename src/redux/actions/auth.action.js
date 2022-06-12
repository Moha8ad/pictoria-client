import AuthActionTypes from '../constants/auth.types.js';

import * as api from '../../api/index.js';

export const account = ({ result, token }) => async (dispatch) => {

  const data = { result, token }
  
  try {
    dispatch({ 
      type: AuthActionTypes.AUTH, 
      payload: data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = (formData, navigateTo) => async (dispatch) => {

  try {

    const { data } = await api.signIn(formData)

    dispatch({ 
      type: AuthActionTypes.AUTH, 
      payload: data 
    });

    navigateTo('/')
    
  } catch (error) {
    console.log(error)
  }
};


export const signup = (formData, navigateTo) => async (dispatch) => {

  try {

    const { data } = await api.signUp (formData)

    dispatch({ 
      type: AuthActionTypes.AUTH, 
      payload: data 
    });
    
    navigateTo('/')
    
  } catch (error) {
    console.log(error)
  }
}