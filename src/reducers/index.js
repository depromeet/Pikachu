import request from 'request';
import { POST_REQUEST_LOGIN } from '../constants';

export default function index(state = {}, action) {
  switch (action.type) {
    case POST_REQUEST_LOGIN:
      request.post({ url: 'http://localhost:3000/api/login', form: action.payload.user }, (error, response, body) => {
        // Do more stuff with 'body' here
        const result = JSON.parse(body);

        if (!result.success) {
          return alert(result.msg); // eslint-disable-line no-alert
        }

        return localStorage.setItem('token', result.token);
      });

      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
}
