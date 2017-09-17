import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import MenuHeader from './components/MenuHeader';
import ScoreForm from './components/ScoreForm';
import Login from './components/Login';
import FourOFour from './components/404';
import ProfileForm from './components/ProfileForm';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			exercises: [],
			bonuses: [],
			userAttributes: [],
			preferences: []

		}
		this.handleCheckedBox = this.handleCheckedBox.bind(this)

	}

	componentDidMount() {
		// Exercise array with inital value of each exercise
		const exercises = [
			{	name: 'Push Ups',
				value: 20,
				type: 'interval',
				double: [1]
			},
			{	name: 'Pull Ups',
				value: 0, 
				type: 'interval' 
			},
			{	name: 'Air Squats',
				value: 0, 
				type: 'interval' 
			},
			{	name: 'Distance Swam',
				value: 1000,
				units: 'Miles',
				type: 'interval'  
			},			
			{	name: 'Distance Ran',
				value: 100,
				units: 'Miles', 
				type: 'interval' 
			},
			{	name: 'Distance Cycled',
				value: 370,
				units: 'Miles',
				type: 'interval'  
			},
			{	name: 'Distance Rowed',
				value: 20,
				units: 'Meters',
				type: 'interval'  
			},								
			{	name: '1-Minute Planks',
				value: 37,
				type: 'interval'  
			},				
			{	name: 'Low Intensity',
				value: 370,
				type: 'timer'  
			},				
			{	name: 'High Intensity',
				value: 200,
				type: 'timer'  
			},				
			{	name: 'Sports',
				value: 370,
				type: 'timer'  
			}
		]

		const bonuses = [
			{	name: 'Nutrition',
				mo: false,
				tu: true,
				we: true,
				th: false,
				fr: false,
				sa: false,
				su: false
			},
			{	name: 'Stretching',
				mo: true,
				tu: true,
				we: false,
				th: false,
				fr: true,
				sa: false,
				su: false
			},
			{	name: 'Tabata',
				mo: false,
				tu: true,
				we: true,
				th: false,
				fr: true,
				sa: false,
				su: false
			}			
		]		
		const userAttributes = [
			{	name: 'User Name',
				value: 'GoodDeedsDeserveDoughnuts',
				type: 'string'
			},
			{	name: 'Email',
				value: 'rruenroeng@gmail.com',
				type: 'string'
			}			
		]
		const preferences = [
			{	name: 'Distance',
				mi: false,
				km: true
			}			
		]
		this.setState({
			exercises: exercises,
			bonuses: bonuses,
			userAttributes: userAttributes,
			preferences: preferences
		})
	}

	handleCheckedBox = event => {
		console.log(event.target)
	}

  render() {
    return (
      <Router>
				<div>
        	<MenuHeader />
					<Switch>
						<Route path='/score' render={() => <ScoreForm exercises={this.state.exercises} bonuses={this.state.bonuses} handleCheckedBox={this.handleCheckedBox}/>} />
						<Route path='/login' render={() => <Login />} />
						<Route path='/profile' render={() => <ProfileForm userAttributes={this.state.userAttributes} preferences={this.state.preferences} handleCheckedBox={this.handleCheckedBox}/>} />
						<Route path='/404' component={FourOFour} />
						<Redirect to='/404' />
					</Switch>
				</div>
			</Router>

    )
  }
}

export default App;
