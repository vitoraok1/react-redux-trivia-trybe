import { SET_NAME, SET_EMAIL, SET_URL } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  url: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case SET_URL:
    return {
      ...state,
      url: action.payload,
    };
  default:
    return state;
  }
};

export default user;
