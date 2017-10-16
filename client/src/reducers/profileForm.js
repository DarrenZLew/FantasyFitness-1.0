import data from './profileForm-fakedata.json';
import { ProfileFormActions } from '../actions';

const initialState = {
	user: {
		userAttributes: data.userAttributes,
		preferences: data.preferences
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case (ProfileFormActions.Types.UpdateForm):
			console.log(state)
		break;	
		default:
			return state	
	}
}