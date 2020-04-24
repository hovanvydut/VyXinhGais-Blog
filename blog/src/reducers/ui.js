import * as types from '../constants/ActionTypes';

const initialState = {
  loading: {
    show: false,
  },
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING: {
      const newLoading = { ...state.loading, show: true };
      return { ...state, loading: newLoading };
    }
    case types.HIDE_LOADING: {
      const newLoading = { ...state.loading, show: false };
      return { ...state, loading: newLoading };
    }
    default:
      return { ...state };
  }
};

export default uiReducer;
