import * as types from '../constants/ActionTypes';

const initialState = {
  post_thumb: {
    home: [],
  },
  post_detail: {
    status: 'success',
  },
};

function PostReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_THUMB: {
      // no reload page
      return state;
    }
    case types.GET_THUMB_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        post_thumb: {
          home: data,
        },
      };
    }
    case types.GET_THUMB_FAILED: {
      return {
        ...state,
      };
    }

    case types.GET_POST: {
      return {
        ...state,
        post_detail: {
          status: 'success',
        },
      };
    }
    case types.GET_POST_SUCCESS: {
      const { post } = action.payload;
      post.status = 'success';
      return {
        ...state,
        post_detail: post,
      };
    }
    case types.GET_POST_FAILED: {
      // eslint-disable-next-line
      const { errorMessage } = action.payload;
      return {
        ...state,
        post_detail: {
          status: 'failed',
        },
      };
    }

    case types.FILTER_POST_BY_TAGNAME_REQUEST: {
      return state;
    }

    case types.FILTER_POST_BY_TAGNAME_SUCCESS: {
      const { posts } = action.payload;
      return {
        ...state,
        post_thumb: {
          home: posts,
        },
      };
    }

    case types.FILTER_POST_BY_CATEGORY_REQUEST: {
      return state;
    }

    case types.FILTER_POST_BY_CATEGORY_SUCCESS: {
      const { posts } = action.payload;
      return {
        ...state,
        post_thumb: {
          home: posts,
        },
      };
    }

    case types.SEARCH_POST_NAME_REQUEST: {
      return state;
    }

    case types.SEARCH_POST_NAME_SUCCESS: {
      const { posts } = action.payload;
      return {
        ...state,
        post_thumb: {
          home: posts,
        },
      };
    }

    default:
      return { ...state };
  }
}

export default PostReducer;
