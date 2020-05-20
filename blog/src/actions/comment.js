import * as types from '../constants/ActionTypes';

export const getAllCommentRequest = postId => {
  return {
    type: types.GET_ALL_COMMENTS_REQUEST,
    payload: {
      postId,
    },
  };
};

export const getAllCommentSuccess = comments => {
  return {
    type: types.GET_ALL_COMMENTS_SUCCESS,
    payload: {
      comments,
    },
  };
};

export const getAllCommentFailure = errorMessage => {
  return {
    type: types.GET_ALL_COMMENTS_FAILURE,
    payload: {
      errorMessage,
    },
  };
};
