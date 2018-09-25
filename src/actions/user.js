import {ActionTypes} from "../common/constants";

export const putUser = userData => {
  return {
    type: ActionTypes.PUT_USER,
    userData
  }
}

export const checkIfUserExists = () => {
  return {
    type: ActionTypes.VALIDATE_USER
  }
}