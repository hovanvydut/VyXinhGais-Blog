import * as types from '../constants/ActionTypes';

const initialState = {
  // allTags is Array
  allTags: null,
};

const TagReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TAGS: {
      // no reload page
      return state;
    }

    case types.GET_ALL_TAGS_SUCCESS: {
      const { data } = action.payload;
      return { ...state, allTags: data };
    }

    default: {
      return state;
    }
  }
};

export default TagReducer;
