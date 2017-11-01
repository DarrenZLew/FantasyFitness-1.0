import React from 'react';
import { Table, Form, Icon, Popup } from 'semantic-ui-react';
import { Field } from 'redux-form';

const Exercises = ({ exercises, currValues, double, newValues }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell width={3}>
					Activity
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the exercise to learn more!'
			      hideOnScroll
    			/>
    		</Table.HeaderCell>
    		<Table.HeaderCell width={4}>
    			Points
    		</Table.HeaderCell>
				<Table.HeaderCell width={3}>
					Current Value
				</Table.HeaderCell>
				<Table.HeaderCell width={3}>
					New Value
				</Table.HeaderCell>
				<Table.HeaderCell>
					Net Change
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{exercises.map((exercise, index) => {
				let { name, points, units, type } = {...exercise}
				let fieldName = []
				let netChange = 'N/A'
				let netChangeStyle = {}
				if (name === double.name) {
					points *= 2
					name = <span>{name}<br/><strong style={{color: 'red'}}>DOUBLE POINTS</strong></span>
				}
				if (type === 'timer') {
					fieldName[0] = 'user.exercises[' + index + '].value.hr'
					fieldName[1] = 'user.exercises[' + index + '].value.min'
					points = points + ' per hour'
				} else if (type === 'interval') {
					fieldName = 'user.exercises[' + index + '].value'
					switch(units) {
						case 'Miles':
							points = points + ' per mile'
							break
						case 'Meters':
							points = points + ' per meter'
							break
						case 'Kilometers':
							points = points + ' per kilometer'
							break
						default:
							break
					}
				}
				if (typeof newValues !== 'undefined') {
					if (type === 'timer') {
						let newValueHr = parseInt(newValues[index].value.hr, 10)
						let newValueMin = parseInt(newValues[index].value.min, 10)
						if (Number.isNaN(newValueHr)) {
							newValueHr = 0
						}
						if (Number.isNaN(newValueMin)) {
							newValueMin = 0
						}
						const newTotalMin = newValueHr * 60 + newValueMin
						const currTotalMin = currValues[index].value.hr * 60 + currValues[index].value.min
						netChange = Math.abs(newTotalMin - currTotalMin) + ' Mins'
						if (newTotalMin > currTotalMin) {
							netChangeStyle = {color: 'green'}
							netChange = '+ ' + netChange
						} else if (newTotalMin < currTotalMin) {
							netChangeStyle = {color: 'red'}
							netChange = '- ' + netChange
						} 
					} else if (type === 'interval') {
						netChange = newValues[index].value - currValues[index].value
						netChange = netChange.toFixed(1).replace(/[.]0$/, "")
						if (netChange > 0) {
							netChangeStyle = {color: 'green'}
							netChange = '+ ' + netChange
						} else if (netChange < 0) {
							netChangeStyle = {color: 'red'}
							netChange = '- ' + Math.abs(netChange)
						}		
					}
				}
				return (
					<Table.Row key={index}>
						<Table.Cell>
							{name} 
						</Table.Cell>
						<Table.Cell>
							{points}
						</Table.Cell>
						{type === 'interval' && 
						<Table.Cell>
							{currValues[index].value} {units}
						</Table.Cell>
						}
						{type === 'interval' && 
						<Table.Cell>
							<Field
								name={fieldName}
								component={NewIntervalExercise}
								units={units}
							/>
						</Table.Cell>
						}
						{type === 'timer' && 
						<Table.Cell>
							{currValues[index].value.hr} Hrs {currValues[index].value.min} Min
						</Table.Cell>
						}
						{type === 'timer' && 
						<Table.Cell>
							<Form.Group>
								<Field
									name={fieldName[0]}
									component={NewTimerExercise}
									label='Hrs' 
									min={0} 
									max={99}
								/>
								<Field
									name={fieldName[1]}
									component={NewTimerExercise}
									label='Mins'
									min={0} 
									max={59} 
								/>
							</Form.Group>
						</Table.Cell>}
						<Table.Cell style={netChangeStyle}>
							{netChange}
						</Table.Cell>
					</Table.Row>
				)
			})}	
		</Table.Body>
	</Table>
)

const NewIntervalExercise = field => {
	let step
	switch (field.units) {
		case 'Miles':
			step = 0.1
			break;
		case 'Meters':
		case 'Kilometers':
			step = 0.5
			break;
		default:
			step = 1		
	} 
	return (
		<Form.Input
			{...field.input}
			type='number' 
			width={8} 
			min={0} 
			max={9999} 
			step={step} 
		/>	
	)										
}

const NewTimerExercise = field => (
	<Form.Input 
	 	{...field.input}
		type='number' 
		label={field.label} 
		labelPosition='right' 
		// width={4} 
		min={field.min} 
		max={field.max}
	/>	
)

export default Exercises