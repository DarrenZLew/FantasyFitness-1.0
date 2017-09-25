import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import auth from './auth';
import scoreForm from './scoreForm';
import headToHead from './headToHead';
import scoreSheet from './scoreSheet';

export default combineReducers({
  auth,
  scoreForm,
  headToHead,
  form: formReducer,
  scoreSheet
});

