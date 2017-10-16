import React, { Component } from 'react';
import { Table, Form, Button, Checkbox, Icon, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ScoreFormActions } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../styles/ScoreForm.css';

class ScoreForm extends Component {
	
	submit = (values) => {
		console.log(values)
	}

	render() {
		console.log(this.props)
		const { handleSubmit, pristine, reset, submitting, initialValues } = this.props
		return (
		 	<Form className='container center scoreForm-form' onSubmit={handleSubmit(this.submit)} >
				<TableExercises exercises={this.props.initialValues.user.exercises} currValues={initialValues.user.exercises} />
				<TableBonuses bonuses={this.props.initialValues.user.bonuses}/>
				<Button 
					type='button' 
					className='exercise-reset' 
					disabled={pristine || submitting} 
					onClick={reset}>
					Reset
				</Button>
				<Button 
					type='submit' 
					className='exercise-submit' 
					disabled={pristine || submitting}>
					Submit
				</Button>
			</Form>
		)
	}
}

const TableExercises = ({ exercises, currValues }) => (
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
    		<Table.HeaderCell width={3}>
    			Points
    		</Table.HeaderCell>
				<Table.HeaderCell width={3}>
					Current Value
				</Table.HeaderCell>
				<Table.HeaderCell width={5}>
					New Value
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{exercises.map((exercise, index) => {
				const { name, points, units, type } = {...exercise}
				let fieldName = []
				if (type === 'timer') {
					fieldName[0] = 'user.exercises[' + index + '].value.hr'
					fieldName[1] = 'user.exercises[' + index + '].value.min'
				} else if (type === 'interval') {
					fieldName = 'user.exercises[' + index + '].value'
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
								component={field => {
																			let step
																			switch (field.units) {
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
													}
								type='number'
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
					</Table.Row>
				)
			})}	
		</Table.Body>
	</Table>
)

const TableBonuses = ({ bonuses }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell colSpan='1'>
					Bonus
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the bonus to learn more!'
			      hideOnScroll
    			/>
				</Table.HeaderCell>
				<Table.HeaderCell>
					Points
				</Table.HeaderCell>
				<Table.HeaderCell></Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{bonuses.map((bonus, index) => {
				const name = 'user.bonuses[' + index + '].value.'
				const fieldName = {
					'mo': name + 'mo',
					'tu': name + 'tu',
					'we': name + 'we',
					'th': name + 'th',
					'fr': name + 'fr',
					'sa': name + 'sa',
					'su':	name + 'su'
				}
				return (
					<Table.Row key={bonus.name}>
						<Table.Cell width={3}>
							{bonus.name}
						</Table.Cell>
						<Table.Cell width={2}>
							{bonus.points}
						</Table.Cell>
						<Table.Cell>
							<Field name={fieldName.mo} component={Bonus} type='checkbox' label='Mon' />	
							<Field name={fieldName.tu} component={Bonus} type='checkbox' label='Tue' />	
							<Field name={fieldName.we} component={Bonus} type='checkbox' label='Wed' />	
							<Field name={fieldName.th} component={Bonus} type='checkbox' label='Thurs' />	
							<Field name={fieldName.fr} component={Bonus} type='checkbox' label='Fri' />	
							<Field name={fieldName.sa} component={Bonus} type='checkbox' label='Sat' />	
							<Field name={fieldName.su} component={Bonus} type='checkbox' label='Sun' />	
						</Table.Cell>
					</Table.Row>
				)
			})}
		</Table.Body>
	</Table>
)

const Bonus = field => (
	<Checkbox
		{...field.input}
		value={field.input.value ? 'on' : 'off'}
		onChange={(e, { checked }) => field.input.onChange(checked)}
		label={field.label}
	/>
)

const NewTimerExercise = field => (
	<Form.Input 
	 	{...field.input}
		type='number' 
		label={field.label} 
		labelPosition='right' 
		width={4} 
		min={field.min} 
		max={field.max}
	/>	
)

const mapStateToProps = state => {
	return { 
		initialValues: {
			user: {
				exercises:state.scoreForm.user.exercises, 
				bonuses: state.scoreForm.user.bonuses
			}
		}
	}
}	

const mapDispatchToProps = dispatch => {
  const { score } = ScoreFormActions;
  return bindActionCreators({ score }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'scoreForm', 
	enableReinitialize: true
})(ScoreForm))