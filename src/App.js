import React, { Component } from 'react';
import './App.css';
import HeaderNavbar from './components/HeaderNavbar';
import ScoreForm from './components/ScoreForm';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			exercises: []
		}
	}

	componentDidMount() {
	// Exercise array with inital value of each exercise
	const exercises = [
		{	name: 'Push Ups',
			value: 20,
			type: 'interval' 
		},
		{	name: 'Pull Ups',
			value: 0, 
			type: 'interval' 
		},
		{	name: 'Running',
			value: 100, 
			type: 'timer' 
		},
		{	name: 'Cycling',
			value: 370,
			type: 'timer'  
		}		 
	]		

	this.setState({exercises})
	}

	// Update value for selected exercise 
	handleExerciseInputChange = (event, index) => {
		let exercises = this.state.exercises.slice()
		exercises[index].value = event.target.value
		this.setState({exercises})
	}

  render() {
    return (
      <div>
        <HeaderNavbar />
        <ScoreForm exercises={this.state.exercises}/>
      </div>

    )
  }
}

export default App;
