import { takeLatest, put } from 'redux-saga/effects';
import _ from 'lodash';

import { ActionTypes, apiRoutes } from '../common/constants';
import apiClient from '../common/apiClient/serverApi';
import { putUser } from '../actions/user';

export function* setUser() {
  try {
    const response = yield apiClient.get(apiRoutes.VALIDATE_TOKEN);
    let user;

    if (response.success) {
      user = response;
      Object.freeze(user);
    } else {
      user = null;
    }
    yield put(putUser(user));

  } catch (error) {
    console.error(error);
  }
}

export function* watchUser() {
  yield takeLatest(ActionTypes.VALIDATE_USER, setUser);
}
