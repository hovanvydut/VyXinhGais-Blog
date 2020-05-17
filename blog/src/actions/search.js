import * as types from '../constants/ActionTypes';

export const searchPostName = postName => {
  return {
    type: types.SEARCH_POST_NAME_REQUEST,
    payload: {
      postName,
    },
  };
};

export const searchPostNameSuccess = posts => {
  return {
    type: types.SEARCH_POST_NAME_SUCCESS,
    payload: {
      posts,
    },
  };
};

export const searchPostNameFailure = errorMessage => {
  return {
    type: types.SEARCH_POST_NAME_FAILURE,
    payload: {
      errorMessage,
    },
  };
};
