import React from 'react';
//import { Segment, Container, Header, Form, Input, Message, Grid, Button } from 'semantic-ui-react';
import { Segment, Container, Header, Form, Input, Message, Grid, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Auth } from '../actions';

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
		}
		
		// immediately logout
		this.props.logout();
	}

	render() {
		return (
			<div>
				<h1 textAlign="center">
					Successfully logged out
				</h1>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return { ...state.auth };
}

const mapDispatchToProps = (dispatch) => {
	const { logout } = Auth;
	return bindActionCreators({ logout }, dispatch);
}

//export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
