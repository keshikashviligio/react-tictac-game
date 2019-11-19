import { createStore, applyMiddleware } from 'redux';

import {reducer, initialState} from './reducers/reducer';

const bindMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware());
  }
  return applyMiddleware();
};

function initStore(state = initialState) {
  return createStore(
    reducer,
    state,
    bindMiddleware(),
  );
}

export default initStore;
