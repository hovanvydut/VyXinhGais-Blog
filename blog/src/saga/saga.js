import { takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import * as actionPost from '../actions/posts';
import * as actionTag from '../actions/tags';
import * as actionCategories from '../actions/categories';
import * as actionUi from '../actions/ui';
import * as actionPopularArticle from '../actions/popularArticle';
import * as authActionCreator from '../actions/auth';
import * as config from '../constants/config';

const { HOST } = config;

// delay
function* getThumbSaga(action) {
  yield put(actionUi.showLoading());
  const { subject } = action.payload;
  try {
    const response = yield axios.get(
      `${HOST}/api/v1/thumb-posts?subject=${subject}`
    );
    yield put(actionPost.getThumbSuccess(response.data));
  } catch (err) {
    // console.log(err);
  }
  delay(1000);
  yield put(actionUi.hideLoading());
}

// PATH: http://localhost:3000/post/:linkPost
// URL:  http://localhost:3000/post/a-loving-heart-is-the-truest-wisdom-abc123mno
function* getPostSaga(action) {
  const { linkPost } = action.payload;
  yield put(actionUi.showLoading());
  try {
    const response = yield axios.get(`${HOST}/api/v1/posts/${linkPost}`);
    yield put(actionPost.getPostSuccess(response.data));
  } catch (error) {
    const errorMessage = `${error?.response?.status}:${error?.response?.statusText}`;
    yield put(actionPost.getPostFailed(errorMessage));
  }
  delay(1000);
  yield put(actionUi.hideLoading());
}

function* getAllTagSaga() {
  try {
    const response = yield axios.get(`${HOST}/api/v1/tags`);
    yield put(actionTag.getAllTagsSuccess(response.data));
  } catch (error) {
    const errorMessage = `${error?.response?.status}:${error?.response?.statusText}`;
    yield put(actionTag.getAllTagsFailed(errorMessage));
  }
}

function* getAllCategoriesSaga() {
  try {
    const response = yield axios.get(`${HOST}/api/v1/categories`);
    yield put(actionCategories.getAllCategoriesSuccess(response.data));
  } catch (error) {
    const errorMessage = `${error?.response?.status}:${error?.response?.statusText}`;
    yield put(actionCategories.getAllCategoriesFailed(errorMessage));
  }
}

function* getPopularArticleSaga() {
  try {
    const response = yield axios.get(`${HOST}/api/v1/popular-article`);
    yield put(actionPopularArticle.getPopularArticleSuccess(response.data));
  } catch (error) {
    const errorMessage = `${error?.response?.status}:${error?.response?.statusText}`;
    yield put(actionPopularArticle.getPopularArticleFailed(errorMessage));
  }
}

function* loginSaga(action) {
  const { email, password } = action.payload;
  yield put(actionUi.showLoading());
  try {
    const response = yield axios.post(`${HOST}/api/v1/login`, {
      email,
      password,
    });
    yield put(authActionCreator.loginSuccess(response.data));
  } catch (error) {
    // const errorMessage = `${error?.response?.status}:${error?.response?.statusText}`;
    // yield put(actionPost.getPostFailed(errorMessage));
    console.log(error.message);
  }
  delay(1000);
  yield put(actionUi.hideLoading());
}

function* signUpSaga(action) {
  const { fullname, email, password, retypePassword } = action.payload;
  yield put(actionUi.showLoading());
  try {
    const response = yield axios.post(`${HOST}/api/v1/signup`, {
      fullname,
      email,
      password,
      retypePassword,
    });

    console.log(response);
    // yield put(authActionCreator.signUp(response.data));
  } catch (error) {
    // const errorMessage = `${error?.response?.status}:${error?.response?.statusText}`;
    // yield put(actionPost.getPostFailed(errorMessage));
    console.log(error);
  }
  delay(1000);
  yield put(actionUi.hideLoading());
}

function* filterPostByTagSaga(action) {
  const { tagName } = action.payload;
  yield put(actionUi.showLoading());
  try {
    const response = yield axios.get(`${HOST}/api/v1/tag/${tagName}`);
    yield put(actionTag.filterPostByTagSuccess(response.data));
  } catch (errMessage) {
    yield put(actionTag.filterPostByTagFailure(errMessage));
  }
  delay(1000);
  yield put(actionUi.hideLoading());
}

function* filterPostByCategorySaga(action) {
  const { linkCategory } = action.payload;
  yield put(actionUi.showLoading());
  try {
    const response = yield axios.get(`${HOST}/api/v1/category/${linkCategory}`);
    yield put(actionCategories.filterPostByCategorySuccess(response.data));
  } catch (errMessage) {
    yield put(actionCategories.filterPostByCategoryFailure(errMessage));
  }
  delay(1000);
  yield put(actionUi.hideLoading());
}

function* rootSaga() {
  yield takeLatest(types.GET_THUMB, getThumbSaga);
  yield takeLatest(types.GET_POST, getPostSaga);
  yield takeLatest(types.GET_ALL_TAGS, getAllTagSaga);
  yield takeLatest(types.GET_ALL_CATEGORIES, getAllCategoriesSaga);
  yield takeLatest(types.GET_POPULAR_ARTICLE, getPopularArticleSaga);
  yield takeLatest(types.USER_LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.USER_SIGNUP_REQUEST, signUpSaga);
  yield takeLatest(types.FILTER_POST_BY_TAGNAME_REQUEST, filterPostByTagSaga);
  yield takeLatest(
    types.FILTER_POST_BY_CATEGORY_REQUEST,
    filterPostByCategorySaga
  );
}

export default rootSaga;
