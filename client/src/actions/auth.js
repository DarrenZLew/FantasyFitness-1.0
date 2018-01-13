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
	//console.log(loginPath);
	return (dispatch) => {
		//fetch(loginPath, {
			//username,
			//password,
		//})

		//fetch(loginPath, {
		fetch('/auth/login', {
			method: 'post',
			body: JSON.stringify({ username, password }),
			//body: JSON.stringify({ password: password, username: username }),

			credentials: 'same-origin',

			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}})
			//.then(res => {
				//debugger;
				//return res.json();
			//})
		.then(res => {
		})
			//debugger;
			//console.log(res.headers.get('set-cookie')); // undefined
			//console.log(document.cookie); // nope
			//return res.json();
		/*}).then(json => {
			debugger;
			if (json.success) {
				this.setState({ error: '' });
				this.context.router.push(json.redirect);
			}
			else {
				this.setState({ error: json.error });
			}
		})*/
		.catch((errors) => {
			debugger;
			dispatch({
				type: Types.Login,
				payload: {
					success: false,
					username,
					errors: errors.response,
				},
			});
		});
			//.then((res) => {
				//console.log(res.data);
				//debugger;

				////localStorage.setItem('token', 'res.data.token');
				////dispatch({
					////type: Types.Login,
					////payload: {
						////success: true,
						////username,
						////token: res.data.token,
					////},
				////});
			//})
	};

	/*
	return (dispatch) => {
		fetch(loginPath, {
			username,
			password,
		}).then(res => res.json())
			.then((res) => {
				console.log(res.data);
				localStorage.setItem('token', 'res.data.token');
				dispatch({
					type: Types.Login,
					payload: {
						success: true,
						username,
						token: res.data.token,
					},
				});
			})
			.catch((errors) => {
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
	*/
}

export function signup({ username, password, email }) {
	return (dispatch) => {
		fetch(signupPath, {
			username,
			password,
			email,
		})
			.then(res => {
				debugger;
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
}

export function logout() {
	return (dispatch) => {
		localStorage.removeItem('token');
		dispatch({
			type: Types.Logout,
		});
	};
}

