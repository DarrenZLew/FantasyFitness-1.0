/**
 * Authorization reducers. JWT is stored in both local storage and in state
 *
 * Store
 *
 * loggedIn: bool - Whether the user is logged in or not,
 * username: string - The user
 * token: string -  JWT to communicate with the server
 * loginErrors: [error] - response data from server about errors
 *
 */
import { Auth } from '../actions';

const localStorage = global.localStorage;

const initialState = {
	username: null,
	token: (localStorage.getItem('token') ? localStorage.getItem('token') : null),
};

export default (state = initialState, action) => {
	switch (action.type) {
			// Login - store token in local storage
		case (Auth.Types.Login):
			if (action.payload.success) {
				const { username, token } = action.payload;
				return { ...state, username, token };
			}
			return { ...state, username: null, loginErrors: action.payload.errors };

			// Signup
		case (Auth.Types.Signup):
			if (action.payload.success) {
				return { ...state, username: action.payload.username, loggedIn: true };
			}
			return { ...state, username: null, signupErrors: action.payload.errors };

			// Logout - remove token from local storage
		case (Auth.Types.Logout):
			return { ...state, token: null, loggedIn: false };

		default:
			return state;
	}
};
