import * as types from '../constants/ActionTypes';

const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_COMMENTS_REQUEST: {
      return state;
    }

    case types.GET_ALL_COMMENTS_SUCCESS: {
      const { comments } = action.payload;
      return {
        ...state,
        comments,
      };
    }

    case types.GET_ALL_COMMENTS_FAILURE: {
      const { errorMessage } = this.props;
      console.log(errorMessage);
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default commentReducer;
