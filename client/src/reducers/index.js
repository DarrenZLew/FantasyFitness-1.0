import { combineReducers } from 'redux';
import auth from './auth';
import headToHead from './headToHead';

export default combineReducers({
  auth, headToHead,
});

