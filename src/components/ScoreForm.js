import React from 'react';
import { Button, Row, Col } from 'react-materialize';
import NumericInput from 'react-numeric-input';
import '../styles/ScoreForm.css';

const ScoreForm = ({ exercises }) => {
	return (
		<form className='container center scoreForm-form'>
			<Row>
				<Col s={2} offset='s3'><h5>Activity</h5></Col>
				<Col s={2}><h5>Current Value</h5></Col>
				<Col s={2}><h5>New Value</h5></Col>
			</Row>
			{exercises.map((exercise, index) => {
				return (
					<Row key={exercise.name}>
						<Col s={2} offset='s3'>{exercise.name}</Col>
						{exercise.type === 'interval' && <IntegerExercise value={exercise.value}/>}
						{exercise.type === 'timer' && <TimerExercise value={exercise.value}/>}
					</Row>			
				)
			})}	
			<Button className='exercise-save'>Save</Button>
		</form>
	)
}

const IntegerExercise = ({ value }) => (
	<div>
		<Col s={2}>{value}</Col>
		<Col s={2} className='exercise-col-integer-input'><NumericInput style={false} className='exercise-integer-input' min={0} max={9999} defaultValue={0} /></Col>	
	</div>
)

const TimerExercise = ({ value }) => {
	const currTime = convertMinsToHrsMins(value)
	let h = <NumericInput style={false} className='exercise-timer-digit-input' min={0} max={99} placeholder={0}/>
	let m = <NumericInput style={false} className='exercise-timer-digit-input' min={0} max={59} placeholder={0}/>

	return (
		<div>
			<Col s={2}>{currTime}</Col>
			<Col s={2}>Hrs: {h}  Mins: {m}</Col>
		</div>
	)
}



const convertMinsToHrsMins = minutes => {
	let h = Math.floor(minutes / 60)
	let m = minutes % 60	
	h = h < 10 ? '0' + h : h
	m = m < 10 ? '0' + m : m
	return (
		'Hrs: ' + h + ' Min: ' + m
	)
}


export default ScoreForm