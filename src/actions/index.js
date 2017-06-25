/* eslint-disable import/prefer-default-export */

import { POST_REQUEST_LOGIN } from '../constants';

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


  return {
    type: POST_REQUEST_LOGIN,
    payload: {
      user,
    },
  };

  // return axios.post({
  //   methos: 'post',
  //   url: 'api/login',
  //   data: user,
  // }).then((res) => {
  //   console.info(res);
  //   return {
  //     type: POST_REQUEST_LOGIN,
  //     payload: {
  //       user,
  //     },
  //   };
  // });
}
