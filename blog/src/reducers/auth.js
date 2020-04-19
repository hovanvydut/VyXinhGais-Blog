import * as types from '../constants/ActionTypes';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST: {
      const { email } = action.payload;
      return {
        logginIn: true,
        user: email,
      };
    }
    case types.USER_LOGIN_SUCCESS: {
      const { token } = action.payload;
      const data = JSON.parse(atob(token.split('.')[1]));
      data.token = token;
      localStorage.setItem('user', JSON.stringify(data));
      return {
        loggedIn: true,
        user: data,
      };
    }
    case types.USER_SIGNUP_REQUEST: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
