/* eslint-disable import/prefer-default-export */

import { GET_REQUEST_LOGIN } from '../constants';

export function setRuntimeVariable({ name, value }) {
  return {
    type: GET_REQUEST_LOGIN,
    payload: {
      name,
      value,
    },
  };
}
export function actionPostLogin(user) {
  return {
    type: GET_REQUEST_LOGIN,
    payload: {
      user,
    },
  };
}
