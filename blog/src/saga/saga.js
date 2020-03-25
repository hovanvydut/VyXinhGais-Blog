import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import * as actionPost from '../actions/posts';
import * as actionUi from '../actions/ui';

// delay
function* getThumbSaga(action) {
  yield put(actionUi.showLoading());
  const { subject } = action.payload;
  const { data, status } = yield axios.get(
    `http://localhost:4400/api/v1/thumb-posts?subject=${subject}`
  );
  if (status === 200) {
    yield put(actionPost.getThumbSuccess(data));
  }
  yield put(actionUi.hideLoading());
}

// PATH: http://localhost:3000/post/:linkPost
// URL:  http://localhost:3000/post/a-loving-heart-is-the-truest-wisdom-abc123mno

function* getPostSaga(action) {
  const { linkPost } = action.payload;
  yield put(actionUi.showLoading());
  try {
    const response = yield axios.get(
      `http://localhost:4400/api/v1/posts?linkPost=${linkPost}`
    );
    yield put(actionPost.getPostSuccess(response.data));
  } catch (error) {
    const errorMessage = `${error.response.status}:${error.response.statusText}`;
    yield put(actionPost.getPostFailed(errorMessage));
  }
  yield put(actionUi.hideLoading());
}

function* rootSaga() {
  yield takeLatest(types.GET_THUMB, getThumbSaga);
  yield takeLatest(types.GET_POST, getPostSaga);
}

export default rootSaga;
