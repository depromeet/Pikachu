import { GET_REQUEST_LOGIN } from '../constants';

export default function index(state = {}, action) {
  switch (action.type) {
    case GET_REQUEST_LOGIN:
      console.info(state, action);
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
