import React from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';

const paperStyles = {
  //width: '400px',
  margin: '20px',
  textAlign: 'center',
}

export default class Login extends React.Component {
  render() {
    return (
      <Paper style={paperStyles}>
        <TextField
          type="text"
          floatingLabelText="Username"
        />
        <TextField
          floatingLabelText="Password"
          type="password"
        /><br />
        <RaisedButton
          label="Log In"
          primary
        />
      </Paper>
    )
  }
}