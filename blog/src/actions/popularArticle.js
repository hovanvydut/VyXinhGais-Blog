import * as types from '../constants/ActionTypes';

export const getPopularArticle = () => {
  return {
    type: types.GET_POPULAR_ARTICLE,
  };
};

export const getPopularArticleSuccess = data => {
  return {
    type: types.GET_POPULAR_ARTICLE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getPopularArticleFailed = errorMessage => {
  return {
    type: types.GET_POPULAR_ARTICLE_FAILED,
    payload: {
      errorMessage,
    },
  };
};
