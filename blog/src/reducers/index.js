import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import posts from './posts';
import ui from './ui';
import tags from './tags';
import categories from './categories';
import popularArticle from './popularArticle';
import rootSaga from '../saga/saga';
import Auth from './auth';
import comment from './comment';

const rootReducer = combineReducers({
  posts,
  ui,
  tags,
  categories,
  popularArticle,
  Auth,
  comment,
});
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middleware = [sagaMiddleware];
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
