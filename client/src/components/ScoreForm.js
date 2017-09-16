import React from 'react';
import { Table, Button, Row, Col } from 'react-materialize';
import NumericInput from 'react-numeric-input';
import '../styles/ScoreForm.css';

const ScoreForm = ({ exercises }) => {
	return (
		<form className='container center scoreForm-form'>
			<Table>
				<thead>
					<tr>
						<th><h5>Activity</h5></th>
						<th><h5>Current Value</h5></th>
						<th><h5>New Value</h5></th>
					</tr>
				</thead>
				<tbody>
					{exercises.map((exercise, index) => {
						return (
							<tr key={exercise.name}>
								<td>{exercise.name}</td>
								{exercise.type === 'interval' && <IntegerExercise value={exercise.value}/>}
								{exercise.type === 'timer' && <TimerExercise value={exercise.value}/>}
							</tr>			
						)
					})}	
				</tbody>
			</Table>
			<Button className='exercise-save'>Save</Button>
		</form>
	)
}

const IntegerExercise = ({ value }) => (
	<td>{value}</td>
	<td className='exercise-col-integer-input'><NumericInput style={false} className='exercise-integer-input' min={0} max={9999} defaultValue={0} /></td>	
)

const TimerExercise = ({ value }) => {
	const currTime = convertMinsToHrsMins(value)
	let h = <NumericInput style={false} className='exercise-timer-digit-input' min={0} max={99} placeholder={0}/>
	let m = <NumericInput style={false} className='exercise-timer-digit-input' min={0} max={59} placeholder={0}/>

	return (
		<div>
			<td>{currTime}</td>
			<td>Hrs: {h}  Mins: {m}</td>
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