import {ActionTypes} from "../common/constants";

export const storeInputChange = (data) => {
  return {
    type: ActionTypes.SET_REGISTER_FORM_PROPERTY_VALUE,
    payload: data
  }
}

export const resetForm = () => {
  return {
    type: ActionTypes.RESET_REGISTER_FORM
  }
}

export const processForm = (formElements, callback) => {
  return {
    type: ActionTypes.PROCESS_REGISTER_FORM,
    callback,
    formElements
  }
}

export const validateForm = () => {
  return {
    type: ActionTypes.VALIDATE_REGISTER_FORM
  }
}

export const mapErrorsFromResponse = (errors, formElements) => {
  return {
    type: ActionTypes.MAP_REGISTER_ERRORS_FROM_RESPONSE,
    errors,
    formElements
  }
}