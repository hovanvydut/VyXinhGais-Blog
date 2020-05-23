import * as types from '../constants/ActionTypes';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {
      loggedIn: true,
      user,
      errorLogin: false,
      errorSignUp: false,
      signUpSuccess: false,
    }
  : {};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_OUT: {
      localStorage.removeItem('user');
      return {};
    }

    case types.USER_LOGIN_REQUEST: {
      return state;
    }

    case types.USER_LOGIN_SUCCESS: {
      const { token } = action.payload;
      const data = JSON.parse(atob(token.split('.')[1]));

      data.token = token;
      localStorage.setItem('user', JSON.stringify(data));

      return {
        ...state,
        loggedIn: true,
        user: data,
      };
    }

    case types.USER_LOGIN_FAILURE: {
      return {
        ...state,
        errorLogin: true,
      };
    }

    case types.USER_SIGNUP_REQUEST: {
      return state;
    }

    case types.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        signUpSuccess: true,
      };
    }

    case types.USER_SIGNUP_FAILURE: {
      return {
        ...state,
        errorSignUp: true,
      };
    }

    case types.SET_FALSE_ALL_SUCCESS_ERROR_AUTH_FLAG: {
      return {
        ...state,
        errorSignUp: false,
        errorLogin: false,
        signUpSuccess: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default AuthReducer;
