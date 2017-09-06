import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';

export default function configureStore(history) {

  const router = routerMiddleware(history);

  const store = createStore(
    combineReducers({
      reducers,
      router: routerReducer,
    }),
    applyMiddleware(logger, router)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
