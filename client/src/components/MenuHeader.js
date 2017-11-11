import React, { Component } from 'react';
import { Menu, Grid, Sidebar, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
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

  toggleMobileMenu = activeMenu => {
  	if (activeMenu || (!activeMenu && this.state.visible && this.state.dimmed)) {
	  	this.setState({ visible:!this.state.visible, dimmed: !this.state.dimmed})
  	}
  }
  handleItemClick = (e, { name, to }) => {
		this.props.history.push(to);
		this.setState({ activeItem: name, visible: false, dimmed: false });
	}

  render () {
  	const { activeItem, visible, dimmed } = this.state
  	return (
  		<Grid>
				<Grid.Row only='computer'>
					<Grid.Column>
				  	<Menu color='blue' inverted pointing secondary>
					    <Menu.Item header	name='Fantasy Fitness' />
							<MenuItemsRouting activeItem={activeItem} handleItemClick={this.handleItemClick} mobile={false} />	
						</Menu>	
						<RoutingPaths />
					</Grid.Column>					
				</Grid.Row>
			  <Grid.Row only='tablet mobile'>
			  	<Grid.Column>
		  			<Sidebar.Pushable>
		  				<Sidebar 
		  					as={Menu} 
		  					animation='overlay' 
		  					width='very wide' 
		  					visible={visible} 
		  					vertical 
		  					inverted 
		  				>
								<MenuItemsRouting 
									activeItem={activeItem} 
									handleItemClick={this.handleItemClick} 
									mobile={true} 
									handleToggleMobileMenu={this.toggleMobileMenu} 
									style={{padding: '20px', fontSize: '1em'}}/>		
		  				</Sidebar>
		  				<Sidebar.Pusher onClick={() => this.toggleMobileMenu(false)} dimmed={dimmed} >
					  		<Menu color='blue' inverted>
					  			<Menu.Item header name='Fantasy Fitness' />
					  			<Menu.Menu position='right'>
					  				<Menu.Item onClick={() => this.toggleMobileMenu(true)}>
					  					<Icon name='sidebar' />
					  				</Menu.Item>
					  			</Menu.Menu>
					  		</Menu>		  						
	  						<RoutingPaths />
		  				</Sidebar.Pusher>
		  			</Sidebar.Pushable>			  		
			  	</Grid.Column>
			  </Grid.Row>
		  </Grid>
  	)
  }
}

const MenuItemsRouting = ({activeItem, handleItemClick, mobile, handleToggleMobileMenu, style}) => (
	<Menu.Menu position='right'>	
		{mobile && 
			<Menu.Item onClick={() => handleToggleMobileMenu(true)} style={{padding: '15px', marginBottom: '15px'}}>
				Close
				<Icon name='remove' />
			</Menu.Item>
		}
		<Menu.Item to='/score' name='score form' active={activeItem === 'score form'} onClick={handleItemClick} style={style}>
			Score
		</Menu.Item>
		<Menu.Item to='/scoresheet' name='score sheet' active={activeItem === 'score sheet'} onClick={handleItemClick} style={style}>
			Score Sheet
		</Menu.Item>
		<Menu.Item to='/league' name='league' active={activeItem === 'league'} onClick={handleItemClick} style={style}>
			League
		</Menu.Item>
		<Menu.Item to='/matchups' name='matchups' active={activeItem === 'matchups'} onClick={handleItemClick} style={style}>
			Matchups
		</Menu.Item>
		<Menu.Item to='/rules' name='rules' active={activeItem === 'rules'} onClick={handleItemClick} style={style}>
			Rules
		</Menu.Item>					
		<Menu.Item to='/profile' name='profile' active={activeItem === 'profile'} onClick={handleItemClick} style={style}>
			Profile
		</Menu.Item>
		<Menu.Item to='/login' name='sign in' active={activeItem === 'sign in'} onClick={handleItemClick} style={style}>
			Sign In
		</Menu.Item>
	</Menu.Menu>
)

const RoutingPaths = () => (
	<Switch>
		<Route exact path='/score' render={() => <ScoreForm />} />
		<Route exact path='/scoresheet' render={() => <ScoreSheet />} />
		<Route path='/login' render={() => <Login />} />
		<Route path='/matchups' render={() => <HeadToHead />} />
		<Route path='/profile' render={() => <ProfileForm />} />
		<Route path='/rules' component={Rules} />
		<Route path='/404' component={FourOFour} />
		<Redirect to='/404' />
	</Switch>	 
)

// withRouter injects history props to trigger routing
export default withRouter(MenuHeader);