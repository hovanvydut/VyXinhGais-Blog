import * as types from '../constants/ActionTypes';

const initialState = {
  // allCategories is Array
  allCategories: null,
};

const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES: {
      // no reload page
      return state;
    }

    case types.GET_ALL_CATEGORIES_SUCCESS: {
      const { data } = action.payload;
      return { ...state, allCategories: data };
    }

    default: {
      return state;
    }
  }
};

export default CategoriesReducer;
