/* eslint-disable import/prefer-default-export */

import {
  POST_REQUEST_LOGIN,

} from '../constants';

export function setRuntimeVariable({ name, value }) {
  return {
    type: POST_REQUEST_LOGIN,
    payload: {
      name,
      value,
    },
  };
}
export function actionPostLogin(user) {
  // https://www.npmjs.com/package/request

  return async (dispatch) => {
    dispatch({
      type: POST_REQUEST_LOGIN,
      payload: {
        user,
      },
    });
  };
}
