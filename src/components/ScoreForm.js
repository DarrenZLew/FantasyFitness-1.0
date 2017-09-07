import React, { Component } from 'react';
import { Button, Modal, Input, Row } from 'react-materialize';

// Exercise array with inital value of each exercise
const exercises = [
	{	name: 'Push Ups',
		value: '0' 
	},
	{	name: 'Pull Ups',
		value: 0 
	},
	{	name: 'Running',
		value: 0 
	},
	{	name: 'Cycling',
		value: 0 
	}		 
]		

class ScoreForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			exercises: exercises 
		}
	}

	// Update value for selected exercise 
	handleExerciseInputChange = (event, index) => {
		let exercises = this.state.exercises.slice()
		exercises[index].value = event.target.value
		this.setState({exercises})
	}

	render() {
		return (
			<form className='container center'>
				{exercises.map((exercise, index) => {
					const errorMessage = 'Enter a number between 0 - 9999'
					const value = this.state.exercises[index].value.toString()
					return (
						<div key={exercise.name}>
							<Modal
								header={exercise.name}
								trigger={<Button>{exercise.name}</Button>}>
								<Input 
									type='number' 
									name={exercise.name} 
									validate 
									min='0'
									max='9999'
									error={errorMessage}
									defaultValue={value}
									onChange={(event) => this.handleExerciseInputChange(event, index)} />
							</Modal>
							<Row>{exercise.name}: {value}</Row>
						</div>
					)
				})}	
			</form>
		)
	}
}

export default ScoreForm