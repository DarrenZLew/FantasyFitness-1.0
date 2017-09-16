import React from 'react';
import { Table, Form, Button, Checkbox, Icon, Popup } from 'semantic-ui-react';
import '../styles/ScoreForm.css';

const ScoreForm = ({ exercises, bonuses, handleCheckedBox }) => (
	<Form className='container center scoreForm-form'>
		<TableExercises exercises={exercises}/>
		<TableBonuses bonuses={bonuses} handleCheckedBox={handleCheckedBox}/>
		<Button className='exercise-reset'>Reset</Button>
		<Button className='exercise-submit'>Submit</Button>
	</Form>
)

const TableExercises = ({ exercises }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell width={5}>
					Activity
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the exercise to learn more!'
			      hideOnScroll
    			/>
    		</Table.HeaderCell>
				<Table.HeaderCell width={3}>Current Value</Table.HeaderCell>
				<Table.HeaderCell width={5}>New Value</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{exercises.map(exercise => {
				const { name,value,units,type } = {...exercise}
				return (
					<Table.Row key={name}>
						<Table.Cell>{name}</Table.Cell>	
						{type === 'interval' && <Table.Cell><CurrIntegerExercise value={value} units={units}/></Table.Cell>}
						{type === 'interval' && <Table.Cell><NewIntegerExercise value={value} units={units}/></Table.Cell>}
						{type === 'timer' && <Table.Cell><CurrTimerExercise value={value}/></Table.Cell>}
						{type === 'timer' && <Table.Cell><NewTimerExercise value={value}/></Table.Cell>}
					</Table.Row>
				)
			})}	
		</Table.Body>
	</Table>
)

const TableBonuses = ({ bonuses, handleCheckedBox }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell colSpan='2'>
					Bonus
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the bonus to learn more!'
			      hideOnScroll
    			/>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{bonuses.map(bonus => {
				const { mo,tu,we,th,fr,sa,su } = {...bonus}
				return (
					<Table.Row key={bonus.name}>
						<Table.Cell width={3}>{bonus.name}</Table.Cell>
						<Table.Cell>	
							<Checkbox label='Mon' checked={mo} onChange={handleCheckedBox}/>
							<Checkbox label='Tues' checked={tu}/>
							<Checkbox label='Wed' checked={we}/>
							<Checkbox label='Thurs' checked={th}/>
							<Checkbox label='Fri' checked={fr}/>
							<Checkbox label='Sat' checked={sa}/>
							<Checkbox label='Sun' checked={su}/>
						</Table.Cell>
					</Table.Row>
				)
			})}
		</Table.Body>
	</Table>
)

const CurrIntegerExercise = ({ value, units }) => (<div>{value} {units}</div>)

const NewIntegerExercise = ({ value, units }) => {
	let step
	switch (units) {
		case 'Miles':
			step = 0.1
			break;
		case 'Meters':
			step = 0.5
			break;
		default:
			step = 1		
	} 
	return (
		<Form.Input type='number' width={8} min={0} max={9999} step={step} defaultValue={value} />	
	)
}

const CurrTimerExercise = ({ value }) => {
	const currTime = convertMinsToHrsMins(value)
	return (
		<div>{currTime}</div>
	)
}

const NewTimerExercise = ({ value }) => {
	let h = <Form.Input type='number' label='Hrs' labelPosition='right' width={4} min={0} max={99} />
	let m = <Form.Input type='number' label='Mins' labelPosition='right' width={4} min={0} max={59} />
	
	return (
		<Form.Group>
		 {h}{m}
		</Form.Group>
	)
}

const convertMinsToHrsMins = minutes => {
	let h = Math.floor(minutes / 60)
	let m = minutes % 60	
	return (
		h + '  Hrs  ' + m + '  Min'
	)
}

export default ScoreForm