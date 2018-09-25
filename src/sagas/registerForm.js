import { takeLatest, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { validateForm } from '../actions/registerForm';
import { ActionTypes, apiRoutes } from '../common/constants';
import apiClient from '../common/apiClient/serverApi';
import { hasInputsWithErrors, mapFormValuesForRequest } from '../common/helpers';


const getRegisterForm = state => state.registerForm;

export function* registerUser({formElements, callback, type}) {
  try {
    yield put(validateForm());
    const registerForm = yield select(getRegisterForm);
    const inputsWithErrors = _.filter(registerForm, input => !input.isValid);

    if (hasInputsWithErrors(inputsWithErrors, formElements)) {
      return;
    }

    const mappedForm = mapFormValuesForRequest(registerForm);
    const response = yield apiClient.post(apiRoutes.SIGN_UP, mappedForm);
    console.log('response: ', response);
    callback(response);
  } catch (error) {
    console.error(error);
  }
}

export function* watchRegistration() {
  yield takeLatest(ActionTypes.PROCESS_REGISTER_FORM, registerUser);
}
