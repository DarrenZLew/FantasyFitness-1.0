import React, { Component } from 'react';
import './App.css';
import MenuHeader from './components/MenuHeader';
import ScoreForm from './components/ScoreForm';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			exercises: [],
			bonuses: []
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

		this.setState({
			exercises: exercises,
			bonuses: bonuses
		})
	}

	handleCheckedBox = event => {
		console.log(event.target)
	}

  render() {
    return (
      <div>
        <MenuHeader />
        <ScoreForm exercises={this.state.exercises} bonuses={this.state.bonuses} handleCheckedBox={this.handleCheckedBox}/>
      </div>

    )
  }
}

export default App;
