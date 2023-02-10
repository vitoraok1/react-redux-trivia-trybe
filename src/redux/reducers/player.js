import { SET_NAME, SET_EMAIL, SET_URL, UPDATE_SCORE, USER_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
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
      gravatarEmail: action.payload,
    };
  case SET_URL:
    return {
      ...state,
      url: action.payload,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case USER_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  default:
    return state;
  }
};

export default user;
