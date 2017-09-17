import React from 'react';
import { Segment, Container, Header, Form, Input, Message, Grid, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Auth } from '../actions';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleLogIn = (e) => {
    console.log('logging in');
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login({
      username,
      password,
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <div style={{ height: '80vh' }}>
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
                  fluid
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