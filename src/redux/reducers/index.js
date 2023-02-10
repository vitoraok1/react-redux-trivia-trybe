import { combineReducers } from 'redux';
import player from './player';
import quiz from './questions';

const rootReducer = combineReducers({ player, quiz });

export default rootReducer;
