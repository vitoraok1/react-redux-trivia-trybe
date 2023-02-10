import { SET_QUESTION, SET_CURRENTQUESTION } from '../actions';

const INITIAL_STATE = {
  questions: [],
  currentQuestion: 0,
};

const quiz = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTION:
    return {
      ...state,
      questions: action.payload,
    };
  case SET_CURRENTQUESTION:
    return {
      ...state,
      currentQuestion: action.payload,
    };
  default:
    return state;
  }
};

export default quiz;
