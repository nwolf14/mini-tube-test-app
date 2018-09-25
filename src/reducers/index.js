import { combineReducers } from 'redux';
//import { polyglotReducer } from 'redux-polyglot';

import registerForm from './registerForm';
import userData from './user';

export default combineReducers({
  registerForm,
  userData
});