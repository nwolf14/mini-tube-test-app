import { ActionTypes } from '../common/constants';
import _ from 'lodash';

import { defaultAddMovieForm } from '../common/constants';
import validator from '../common/validator';

export default function addMovieForm(state = {}, action) {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case ActionTypes.SET_FORM_PROPERTY_VALUE:
      const { value, inputName } = action.payload;
      newState[inputName].touched = true;
      newState[inputName].value = value;
      newState[inputName] = validator.validateInput(newState[inputName]);
      return newState;

    case ActionTypes.RESET_FORM:
      return defaultAddMovieForm;

    case ActionTypes.VALIDATE_FORM:
      return validator.validateForm(newState);

    default:
      return newState;
  }
}