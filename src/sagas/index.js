import { all } from 'redux-saga/effects';

import { watchRegistration } from './registerForm';
import { watchUser } from './user';

export default function* rootSaga() {
  yield all([
    watchRegistration(),
    watchUser(),
  ]);
}