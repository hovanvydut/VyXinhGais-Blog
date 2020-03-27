import * as types from '../constants/ActionTypes';

const initialState = {
  post_thumb: {
    home: []
  },
  post_detail: {
    status: 'success'
  }
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
          home: data
        }
      };
    }
    case types.GET_THUMB_FAILED: {
      return {
        ...state
      };
    }

    case types.GET_POST: {
      return {
        ...state,
        post_detail: {
          status: 'success'
        }
      };
    }
    case types.GET_POST_SUCCESS: {
      const { post } = action.payload;
      post.status = 'success';
      return {
        ...state,
        post_detail: post
      };
    }
    case types.GET_POST_FAILED: {
      // eslint-disable-next-line
      const { errorMessage } = action.payload;
      return {
        ...state,
        post_detail: {
          status: 'failed'
        }
      };
    }

    default:
      return { ...state };
  }
}

export default PostReducer;
