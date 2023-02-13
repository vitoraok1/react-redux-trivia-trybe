import * as Extras from '../../extras/functions';

export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_URL = 'SET_URL';
export const SET_QUESTION = 'SET_QUESTION';
export const SET_CURRENTQUESTION = 'SET_CURRENTQUESTION';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const USER_ASSERTIONS = 'USER_ASSERTIONS';
export const SET_SAVE = 'SET_SAVE';
export const RESET_SCORE = 'RESET_SCORE';

export const setQuiz = (data) => ({
  type: SET_QUESTION,
  payload: data,
});

export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setURL = (email) => ({
  type: SET_URL,
  payload: Extras.generateUrl(email),
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: score,
});

export const resetScore = () => ({
  type: RESET_SCORE,
  payload: 0,
});

export const userAssertions = (payload) => ({
  type: USER_ASSERTIONS,
  payload,
});
