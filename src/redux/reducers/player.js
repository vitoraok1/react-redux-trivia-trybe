import { SET_NAME,
  SET_EMAIL,
  SET_URL,
  UPDATE_SCORE,
  USER_ASSERTIONS,
  SET_SAVE,
  RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
  url: '',
  save: false,
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
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
    };
  case USER_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case SET_SAVE:
    return {
      ...state,
      save: action.payload,
    };
  default:
    return state;
  }
};

export default user;
