import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import history from './history';
import createRootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      )
    )
  );
  sagaMiddleware.run(rootSaga);
  window.store = store;
  return store;
};

export { history, configureStore };
