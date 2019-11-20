import { combineReducers } from 'redux';
import colorReducer from './colorReducer';
import userAuthReducer from './userAuthReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    result: colorReducer,
    auth: userAuthReducer,
    error: errorReducer
})