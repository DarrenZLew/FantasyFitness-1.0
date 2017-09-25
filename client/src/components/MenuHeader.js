import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/HeaderNavbar.css';

class MenuHeader extends Component {
  state = { activeItem: 'score form' }

  handleItemClick = (e, { name, to }) => {
		this.props.history.push(to);
		this.setState({ activeItem: name });
	}

  render () {
  	const { activeItem } = this.state
  	return (
		  <Menu color='blue' inverted pointing secondary>
		    <Menu.Item name='Fantasy Fitness'/>
		    <Menu.Menu position='right'>
		    	<Menu.Item to='/score' name='score form' active={activeItem === 'score form'} onClick={this.handleItemClick}>
						Score
					</Menu.Item>
		    	<Menu.Item to='/scoresheet' name='score sheet' active={activeItem === 'score sheet'} onClick={this.handleItemClick}>
						Score Sheet
					</Menu.Item>
		    	<Menu.Item to='/league' name='league' active={activeItem === 'league'} onClick={this.handleItemClick}>
						League
					</Menu.Item>
		    	<Menu.Item to='/rules' name='rules' active={activeItem === 'rules'} onClick={this.handleItemClick}>
						Rules
					</Menu.Item>
		    	<Menu.Item to='/profile' name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
						Profile
					</Menu.Item>
		    	<Menu.Item to='/login' name='sign in' active={activeItem === 'sign in'} onClick={this.handleItemClick}>
						Sign In
					</Menu.Item>
		    </Menu.Menu>
		  </Menu>
  	)
  }
}

// withRouter injects history props to trigger routing
export default withRouter(MenuHeader);