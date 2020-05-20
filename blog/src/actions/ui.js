import * as types from '../constants/ActionTypes';

export const showLoading = () => {
  return {
    type: types.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: types.HIDE_LOADING,
  };
};
