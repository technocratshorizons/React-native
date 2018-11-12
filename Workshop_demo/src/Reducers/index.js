import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import kilometers from './KiloMetersReducer'

// Redux
export default combineReducers({
  Auth: AuthReducer,
  kilometers: kilometers
})
