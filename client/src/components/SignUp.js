import React from 'react';
import { Segment, Container, Header, Form, Input, Message, Grid, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Auth } from '../actions';

class SignUp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: 'like@an.email',
			password: 'password',
			email: 'email@email.com'
		}
	}

	validateForm() {
		// TODO: put validation back in
		return true;

		return (
			this.state.username.length > 0 &&
			this.state.password.length > 0 &&
			this.state.email.length >0);
		}

		handleLogIn = (e) => {
			console.log('Adding User');

			e.preventDefault();

			if (this.validateForm()) {
				const { username, password, email} = this.state;

				this.props.signup({
					username,
					password,
					email
				});
			}
			else
			{
				console.log("wrong!");
			}
		}


		render() {
			const { username, password, email} = this.state;
			const { signup, login } = this.props;
			return (
				<div>
					<div style={{ height: '100vh' }}>
						<Grid
							textAlign='center'
							style={{ height: '100%' }}
							verticalAlign='middle'
							>
							<Grid.Column style={{ maxWidth: 450 }}>
								<Header>Sign up</Header>

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
										<Form.Input
											fluid
											icon='mail'
											iconPosition='left'
											placeholder='Email'
											type='email'
											value={email}
											onChange={e => this.setState({ email: e.target.value })}
											/>
										<Button color='blue' fluid size='large' type='submit'>Sign Up!</Button>
									</Segment>
								</Form>
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
		const { login, signup } = Auth;
		return bindActionCreators({ login, signup }, dispatch);
	}

	export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
