import { ActionTypes } from '../common/constants';
import userModel from '../models/registerForm';


export default function userData(state = null, action) {
  switch (action.type) {
    case ActionTypes.PUT_USER:
      return action.userData;

    default:
      return state;
  }
}