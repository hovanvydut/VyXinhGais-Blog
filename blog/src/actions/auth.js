import * as types from '../constants/ActionTypes';

export const loginRequest = (email = '', password = '') => {
  return {
    type: types.USER_LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
  };
};

export const loginSuccess = token => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
};

export const loginFail = errorMessage => {
  return {
    type: types.USER_LOGIN_FAILURE,
    payload: {
      errorMessage,
    },
  };
};

export const signUpRequest = data => {
  return {
    type: types.USER_SIGNUP_REQUEST,
    payload: data,
  };
};

export const signUpSuccess = () => {
  return {
    type: types.USER_SIGNUP_SUCCESS,
  };
};

export const signUpFail = () => {
  return {
    type: types.USER_SIGNUP_FAILURE,
  };
};
