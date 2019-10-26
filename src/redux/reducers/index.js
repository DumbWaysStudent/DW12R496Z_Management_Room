import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigators/RootNavigator'
import reducersRooms from './reducersRoom';
import reducersAuth from './reducersAuth';
import reducersCustomer from './reducersCustomer';

const reducerRouter = createNavigationReducer(RootNavigator);
const appReducer = combineReducers({
  router: reducerRouter,
  rooms: reducersRooms,
  authData: reducersAuth,
  customers: reducersCustomer
})

export default appReducer