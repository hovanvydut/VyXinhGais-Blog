import * as types from '../constants/ActionTypes';

export const getAllTags = () => {
  return {
    type: types.GET_ALL_TAGS
  };
};

export const getAllTagsSuccess = data => {
  return {
    type: types.GET_ALL_TAGS_SUCCESS,
    payload: {
      data
    }
  };
};

export const getAllTagsFailed = errorMessage => {
  return {
    type: types.GET_ALL_TAGS_FAILED,
    payload: {
      errorMessage
    }
  };
};
