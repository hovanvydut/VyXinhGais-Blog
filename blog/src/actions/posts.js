import * as types from '../constants/ActionTypes';

export const getThumb = (subject = '') => {
  return {
    type: types.GET_THUMB,
    payload: {
      subject,
    },
  };
};

export const getThumbSuccess = data => {
  return {
    type: types.GET_THUMB_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getThumbFailed = error => {
  return {
    type: types.GET_THUMB_FAILED,
    payload: {
      error,
    },
  };
};

export const getPost = linkPost => {
  return {
    type: types.GET_POST,
    payload: {
      linkPost,
    },
  };
};

export const getPostSuccess = post => {
  return {
    type: types.GET_POST_SUCCESS,
    payload: {
      post,
    },
  };
};

export const getPostFailed = errorMessage => {
  return {
    type: types.GET_POST_FAILED,
    payload: {
      errorMessage,
    },
  };
};
