import React from 'react';
//import { Segment, Container, Header, Form, Input, Message, Grid, Button } from 'semantic-ui-react';
import { Segment, Container, Header, Form, Input, Message, Grid, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Auth } from '../actions';

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			//username: 'Michael',
			username: 'like@an.email',
			password: 'password',
		}
	}

	validateForm() {
		// TODO: put validation back in
		return true;

		return (
			this.state.username.length > 0 &&
			this.state.password.length > 0);
	}

	handleLogIn = (e) => {
		console.log('logging in');

		e.preventDefault();

		if (this.validateForm()) {
			const { username, password } = this.state;

			this.props.login({
				username,
				password,
			});
		}
		else
		{
			console.log("wrong!");
		}
	}


	render() {
		const { username, password } = this.state;

		return (
			<div>
				<form action="/auth/login" method="post">
					<div>
					<label>Username:</label>
					<input type="text" name="username"/><br/>
					</div>
					<div>
					<label>Password:</label>
					<input type="password" name="password"/>
					</div>
					<div>
					<input type="submit" value="Submit"/>
					</div>
				</form>

				<div style={{ height: '100vh' }}>
					<Grid
						textAlign='center'
						style={{ height: '100%' }}
						verticalAlign='middle'
					>
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header>Log in</Header>

							<Form size='large' onSubmit={this.handleLogIn}>
								<Segment stacked>
									<Form.Input
										autoFocus
										icon='user'
										iconPosition='left'
										placeholder='Username'
										value={username}
										onChange={e => this.setState({ username: e.target.value })}
									/>
									<Form.Input
										fluid
										icon='lock'
										iconPosition='left'
										placeholder='Password'
										type='password'
										value={password}
										onChange={e => this.setState({ password: e.target.value })}
									/>
									<Button color='blue' fluid size='large' type='submit'>Login</Button>
								</Segment>
							</Form>

							<Message>
								New to us? <a href='#'>Sign Up</a>
							</Message>
						</Grid.Column>
					</Grid>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return { ...state.auth };
}

const mapDispatchToProps = (dispatch) => {
	const { login } = Auth;
	return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
