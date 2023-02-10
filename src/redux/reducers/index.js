import { combineReducers } from 'redux';
import user from './user';
import quiz from './questions';

const rootReducer = combineReducers({ user, quiz });

export default rootReducer;
