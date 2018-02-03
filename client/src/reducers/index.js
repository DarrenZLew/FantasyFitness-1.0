import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import auth from './auth';
import scoreForm from './scoreForm';
import scoreSheet from './scoreSheet';
import headToHead from './headToHead';
import profileForm from './profileForm';
import leagueScoreSheet from './leagueScoreSheet';

export default combineReducers({
  auth,
  scoreForm,
  form: formReducer,
  scoreSheet,
  headToHead,
  profileForm,
  leagueScoreSheet
});

