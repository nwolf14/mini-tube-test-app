import { ActionTypes, inputTypes } from "../common/constants";
import registerFormModel from "../models/registerForm";
import validator from "../common/validator";
import { chooseInputValidationSchema } from '../common/helpers';

import _ from "lodash";

const defaultForm = new registerFormModel();

export default function registerForm(state = defaultForm, action) {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case ActionTypes.SET_REGISTER_FORM_PROPERTY_VALUE:
      const { value, inputName = '' } = action.payload;
      let input = newState[inputName] || {};

      input.touched = true;
      input.value = value;
      input = chooseInputValidationSchema(input, inputName, newState);

      newState[inputName] = input;

      return newState;



    case ActionTypes.MAP_REGISTER_ERRORS_FROM_RESPONSE:
      let firstInputWithError;
      const errors = action.errors || {};
      const formElements = action.formElements || {};
      
      _.map(errors, (error, inputName) => {
        if(newState[inputName]) {
          if (!firstInputWithError) {
            firstInputWithError = inputName;
          }
          newState[inputName].errorMsg = error;
          newState[inputName].isValid = false;
        }
      });

      if (formElements[firstInputWithError]) {
        formElements[firstInputWithError].focus();
      }

      return newState;



  case ActionTypes.RESET_REGISTER_FORM:
    return defaultForm;

  case ActionTypes.VALIDATE_REGISTER_FORM:
    return validator.validateForm(newState);

  default:
    return newState;
  }
}
