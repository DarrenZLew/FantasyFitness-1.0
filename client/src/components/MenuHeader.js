import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import '../styles/HeaderNavbar.css';

export default class MenuHeader extends Component {
  state = { activeItem: 'score form' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
  	const { activeItem } = this.state
  	return (
		  <Menu color='blue' inverted pointing secondary>
		    <Menu.Item name='Fantasy Fitness'/>
		    <Menu.Menu position='right'>
		    	<Menu.Item name='score form' active={activeItem === 'score form'} onClick={this.handleItemClick}/>
		    	<Menu.Item name='team' active={activeItem === 'team'} onClick={this.handleItemClick}/>
		    	<Menu.Item name='league' active={activeItem === 'league'} onClick={this.handleItemClick}/>
		    	<Menu.Item name='rules' active={activeItem === 'rules'} onClick={this.handleItemClick}/>
		    	<Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}/>
		    	<Menu.Item name='sign in' active={activeItem === 'sign in'} onClick={this.handleItemClick}/>
		    </Menu.Menu>
		  </Menu>
  	)
  }
}