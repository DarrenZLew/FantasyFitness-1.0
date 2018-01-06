import React, { Component } from 'react';
import { Menu, Grid, Sidebar, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ScoreForm from '../components/scoreForm/ScoreForm';

//import LoginScreen from '../components/LoginScreen';
import Login from '../components/Login';

import FourOFour from '../components/404';
import ScoreSheet from '../components/ScoreSheet';
import Rules from '../components/Rules';
import ProfileForm from '../components/ProfileForm';
import HeadToHead from '../components/HeadToHead';

class MenuHeader extends Component {
	constructor(props) {
		super(props)

		// attempt to properly set the activeItem based on the current page
		this.state = {
			//activeItem: 'score form', // original default
			activeItem: props.location.pathname,
			visible: false,
			dimmed: false
		}
	}

	toggleMobileMenu = activeMenu => {
		if (activeMenu || (!activeMenu && this.state.visible && this.state.dimmed)) {
			this.setState({ visible:!this.state.visible, dimmed: !this.state.dimmed})
		}
	}

	handleItemClick = (e, { name, to }) => {
		this.props.history.push(to);
		this.setState({ activeItem: to, visible: false, dimmed: false });
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


const menuItems = [
	{
		path: '/score',
		name: 'Score',
		displayName: 'Score'
	},

	{
		path: '/scoresheet',
		name: 'score sheet',
		displayName: 'Score Sheet'
	},

	{
		path: '/league',
		name: 'league',
		displayName: 'League'
	},

	{
		path: '/matchups',
		name: 'matchups',
		displayName: 'Matchups'
	},

	{
		path: '/rules',
		name: 'rules',
		displayName: 'Rules'
	},

	{
		path: '/profile',
		name: 'profile',
		displayName: 'Profile'
	},

	{
		path: '/login',
		name: 'sign in',
		displayName: 'Sign In'
	}
];

const MenuItemsRouting = ({activeItem, handleItemClick, mobile, handleToggleMobileMenu, style}) => (
	<Menu.Menu position='right'>
		{mobile &&
				<Menu.Item onClick={() => handleToggleMobileMenu(true)} style={{padding: '15px', marginBottom: '15px'}}>
					Close
					<Icon name='remove' />
				</Menu.Item>
		}

		{menuItems.map((menuItem, index) => // using index is silly here and will result in problems if ever we make menu items dynamic
			<Menu.Item to={menuItem.path}
				name={menuItem.name}
				active={activeItem === menuItem.path}
				onClick={handleItemClick}
				key={index} // TODO: make less worse
				style={style}>
				{menuItem.displayName}
			</Menu.Item>
		)}
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
