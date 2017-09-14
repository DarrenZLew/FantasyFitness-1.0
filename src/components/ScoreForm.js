import React from 'react';
import { Button, Row, Col } from 'react-materialize';
import '../styles/ScoreForm.css';

const ScoreForm = ({ exercises }) => {
	return (
		<form className='container center'>
			{exercises.map((exercise, index) => {
				const value = exercises[index].value.toString()
				return (
					<div key={exercise.name}>
						<h3>{exercise.name}</h3>
						{exercise.type === 'interval' && <IntegerButton value={value} />}
						{exercise.type === 'timer' && <TimerButton value={value}/>}			
					</div>
				)
			})}	
			<Button className='exercise-save'>Save</Button>
		</form>
	)
}

const IntegerButton = ({ value }) => (
	<div>
		<Row>
			<Button className='red exercise-minus'>--</Button>
			<Button className='red exercise-minus'>-</Button>
			<Button className='exercise-input'>{value}</Button>
			<Button className='green exercise-plus'>+</Button>
			<Button className='green exercise-plus'>++</Button>
		</Row>
		<Row className='exercise-current-value'>Current: {value}</Row>
	</div>
)

const TimerButton = ({ value }) => {
	let hrs = Math.floor(value / 60)
	let mins = value % 60

	return(
		<div>
			<Row>
				<div className='exercise-timer-row'>
					<span>Hrs</span>
					<Button className='red exercise-hour'>-1</Button>
					<Button className='green exercise-hour'>+1</Button>
				</div>
			</Row>
			<Row>
				<div className='exercise-timer-row'>
					Mins
					<Button className='red exercise-fifteen'>-15</Button>
					<Button className='red exercise-five'>-5</Button>
					<Button className='green exercise-five'>+5</Button>
					<Button className='green exercise-fifteen'>+15</Button>
				</div>
			</Row>
			<Row>
				<span>Total Time </span>
				<span>Hrs</span><Button>{hrs}</Button>
				<span>Mins</span><Button>{mins}</Button>
			</Row>
			<Row>Current Total Time: {hrs} : {mins}</Row>
		</div>
	)
}

export default ScoreForm