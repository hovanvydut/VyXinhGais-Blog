import * as types from '../constants/ActionTypes';

export const getAllCategories = () => {
  return {
    type: types.GET_ALL_CATEGORIES,
  };
};

export const getAllCategoriesSuccess = data => {
  return {
    type: types.GET_ALL_CATEGORIES_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getAllCategoriesFailed = errorMessage => {
  return {
    type: types.GET_ALL_CATEGORIES_FAILED,
    payload: {
      errorMessage,
    },
  };
};
