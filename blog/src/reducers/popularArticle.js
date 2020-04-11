import * as types from '../constants/ActionTypes';

const initialState = {
  // popularArticle is Array
  allPopularArticle: null,
};

const PopularArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POPULAR_ARTICLE: {
      // no reload page
      return state;
    }

    case types.GET_POPULAR_ARTICLE_SUCCESS: {
      const { data } = action.payload;
      return { ...state, allPopularArticle: data };
    }

    default: {
      return state;
    }
  }
};

export default PopularArticleReducer;
