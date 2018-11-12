import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {AsyncStorage} from 'react-native';

import reducers from './Reducers';

let middlewares = null;
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares = compose(applyMiddleware(thunk, logger))
}
else{
  middlewares = compose(applyMiddleware(thunk))
}

export default function getStore(){
  const store = createStore(reducers,undefined,middlewares)
//   persistStore(store,{storage:AsyncStorage},() => console.log("Hii Persist"))
  return store;
}
