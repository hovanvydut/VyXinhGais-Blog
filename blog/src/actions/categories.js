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

export const filterPostByCategory = linkCategory => ({
  type: types.FILTER_POST_BY_CATEGORY_REQUEST,
  payload: {
    linkCategory,
  },
});

export const filterPostByCategorySuccess = posts => ({
  type: types.FILTER_POST_BY_CATEGORY_SUCCESS,
  payload: {
    posts,
  },
});

export const filterPostByCategoryFailure = errorMessage => ({
  type: types.FILTER_POST_BY_CATEGORY_FAILURE,
  payload: {
    errorMessage,
  },
});
