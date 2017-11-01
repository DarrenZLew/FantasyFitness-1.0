import React, { Component } from 'react';
import { Menu, Grid, Sidebar, Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import '../styles/HeaderNavbar.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ScoreForm from '../components/scoreForm/ScoreForm';
import Login from '../components/Login';
import FourOFour from '../components/404';
import ScoreSheet from '../components/ScoreSheet';
import Rules from '../components/Rules';
import ProfileForm from '../components/ProfileForm';
import HeadToHead from '../components/HeadToHead';

class MenuHeader extends Component {
  
  state = { 
  	activeItem: 'score form',
  	visible: false,
  	dimmed: false 
  }

  toggleVisibility = () => this.setState({ visible:!this.state.visible, dimmed: !this.state.dimmed})

  handleItemClick = (e, { name, to }) => {
		this.props.history.push(to);
		this.setState({ activeItem: name });
	}

  render () {
  	const { activeItem, visible, dimmed } = this.state
  	return (
  		<Grid>
				<Grid.Row only='computer'>
					<Grid.Column>
					  <Menu color='blue' inverted pointing secondary>
					    <Menu.Item name='Fantasy Fitness' />
							<Menu.Menu position='right'>
								<MenuItemsRouting activeItem={activeItem} handleItemClick={this.handleItemClick} />	
							</Menu.Menu>
					  </Menu>
						<Grid.Column>
							<RoutingPaths />	
						</Grid.Column>					  					  
					</Grid.Column>
				</Grid.Row>
			  <Grid.Row only='tablet mobile'>
			  	<Grid.Column>
			  		<Menu color='blue' inverted pointing secondary>
			  			<Menu.Item name='Fantasy Fitness' />
			  			<Menu.Menu position='right'>
			  				<Menu.Item name='content' onClick={this.toggleVisibility}>
			  					<Icon name='content' />
			  				</Menu.Item>
			  			</Menu.Menu>
			  		</Menu>
		  			<Sidebar.Pushable as={Segment}>
		  				<Sidebar as={Menu} animation='overlay' width='wide' visible={visible} vertical inverted>
								<MenuItemsRouting activeItem={activeItem} handleItemClick={this.handleItemClick} />		
		  				</Sidebar>
		  				<Sidebar.Pusher dimmed={dimmed}>
		  					<Segment>
		  						<RoutingPaths />
								</Segment> 			
		  				</Sidebar.Pusher>
		  			</Sidebar.Pushable>			  		
			  	</Grid.Column>
			  </Grid.Row>
		  </Grid>
  	)
  }
}

const MenuItemsRouting = ({activeItem, handleItemClick}) => (
	<div>
		<Menu.Item to='/score' name='score form' active={activeItem === 'score form'} onClick={handleItemClick}>
			Score
		</Menu.Item>
		<Menu.Item to='/scoresheet' name='score sheet' active={activeItem === 'score sheet'} onClick={handleItemClick}>
			Score Sheet
		</Menu.Item>
		<Menu.Item to='/league' name='league' active={activeItem === 'league'} onClick={handleItemClick}>
			League
		</Menu.Item>
		<Menu.Item to='/matchups' name='matchups' active={activeItem === 'matchups'} onClick={handleItemClick}>
			Matchups
		</Menu.Item>
		<Menu.Item to='/rules' name='rules' active={activeItem === 'rules'} onClick={handleItemClick}>
			Rules
		</Menu.Item>					
		<Menu.Item to='/profile' name='profile' active={activeItem === 'profile'} onClick={handleItemClick}>
			Profile
		</Menu.Item>
		<Menu.Item to='/login' name='sign in' active={activeItem === 'sign in'} onClick={handleItemClick}>
			Sign In
		</Menu.Item>
	</div>
)

const RoutingPaths = () => (
	<Switch>
		<Route exact path='/score' render={() => <ScoreForm />} />
		<Route exact path='/scoresheet' render={() => <ScoreSheet />} />
		<Route path='/login' render={() => <Login />} />
		<Route path='/matchups' render={() => <HeadToHead />} />
		<Route path='/profile' render={() => <ProfileForm userAttributes={this.state.userAttributes} preferences={this.state.preferences} handleCheckedBox={this.handleCheckedBox}/>} />
		<Route path='/rules' component={Rules} />
		<Route path='/404' component={FourOFour} />
		<Redirect to='/404' />
	</Switch>	 
)

// withRouter injects history props to trigger routing
export default withRouter(MenuHeader);