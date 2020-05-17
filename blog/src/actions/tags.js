import * as types from '../constants/ActionTypes';

export const getAllTags = () => {
  return {
    type: types.GET_ALL_TAGS,
  };
};

export const getAllTagsSuccess = data => {
  return {
    type: types.GET_ALL_TAGS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getAllTagsFailed = errorMessage => {
  return {
    type: types.GET_ALL_TAGS_FAILED,
    payload: {
      errorMessage,
    },
  };
};

export const filterPostByTag = tagName => ({
  type: types.FILTER_POST_BY_TAGNAME_REQUEST,
  payload: {
    tagName,
  },
});

export const filterPostByTagSuccess = posts => ({
  type: types.FILTER_POST_BY_TAGNAME_SUCCESS,
  payload: {
    posts,
  },
});

export const filterPostByTagFailure = errorMessage => ({
  type: types.FILTER_POST_BY_TAGNAME_FAILURE,
  payload: {
    errorMessage,
  },
});
