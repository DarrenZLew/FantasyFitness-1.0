const localStorage = global.localStorage;

// Backend api paths
const loginPath = '/auth/login';
const signupPath = '/auth/signup';

// Types of actions to identify which action occurs on the reducer
export const Types = {
	Login: 'AUTH_Login',
	Signup: 'AUTH_Signup',
	Logout: 'AUTH_Logout',
};

/**
 * Attempt to log in. Authentication tokens will be stored on local storage.
 * React components will access the token via Redux
 * @param {object}
 *  username: String
 *  password: String
 */
export function login({ username, password }) {
	return (dispatch) => {
    console.log("Wrong place.");
		fetch(loginPath, {
			method: 'post',
			body: JSON.stringify({ username, password }),

			credentials: 'same-origin',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}})
			.then(res => {
				// TODO: better, less-wrong redirection
				document.querySelector('a[to="/score"]').click();

				// TODO: do we need to do anything here? Maybe redirect to somewhere?
				//console.log(res.data);
				//localStorage.setItem('token', 'res.data.token');
				//dispatch({
					//type: Types.Login,
					//payload: {
						//success: true,
						//username,
						//token: res.data.token,
					//},
				//});
			})
			.catch((errors) => {
				// NOTE: this never gets hit. We just try/fail to redirect to FAILURE page, which doesn't exist
				dispatch({
					type: Types.Login,
					payload: {
						success: false,
						username,
						errors: errors.response,
					},
				});
			});
	};
};

export function signup({ username, password, email }) {
	return (dispatch) => {
		console.log("Hello");
    fetch(signupPath, {
			username,
			password,
			email,
		})
			.then(res => {
        console.log("Puff n' Stuff!");
				return res.json();
			})
			.then((res) => {
				dispatch({
					type: Types.Signup,
					payload: {
						success: true,
						username,
					},
				});
			})
			.catch((errors) => {
				dispatch({
					type: Types.Signup,
					payload: {
						success: false,
						username,
						errors,
					},
				});
			});
	};
};

export function logout() {
	return (dispatch) => {
		localStorage.removeItem('token');
		dispatch({
			type: Types.Logout,
		});
	};
}

