import * as Extras from '../../extras/functions';

export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_URL = 'SET_URL';

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
