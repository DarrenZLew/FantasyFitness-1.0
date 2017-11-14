import React, { Component } from 'react';
import { Table, Form, Icon, Popup, Grid, Segment, Sidebar, Button, Dropdown, Header } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { AddActivitiesList, RemoveActivitiesList, netChange } from './ScoreFormFunctions';


class Exercises extends Component {

	state = { activeIndexSubmit: -1, activeIndexDetails: -1, selectedInactiveActivities: [], selectedActiveActivities: [] } 

	toggleVisibilitySubmit = activeIndexSubmit => {this.setState({ activeIndexSubmit, activeIndexDetails: -1 })}

	toggleVisibilityDetails = activeIndexDetails => {this.setState({ activeIndexDetails, activeIndexSubmit: -1})}

	// Updates from add dropdown list for currently selected inactive activities
	selectInactiveActivity = (e, { value }) => {
		this.setState({ selectedInactiveActivities: value })
	}

	// Updates from remove dropdown list for currently selected active activities
	selectActiveActivity = (e, { value }) => {
		this.setState({ selectedActiveActivities: value })
	}

	// Function used to call action creator functions addActivity/removeActivity with currently selected inactive/active activities from droplist.
	// Resets selected inactive/active activities afterwards 
	updateActivitiesList = updateFunction => {
		if (updateFunction === 'add') {
			this.props.addActivity(this.state.selectedInactiveActivities)
		} else if (updateFunction === 'remove') {
			this.props.removeActivity(this.state.selectedActiveActivities)
		}
		this.setState({ selectedInactiveActivities: [] })
		this.setState({ selectedActiveActivities: [] })	
	}

	render() {
		const { activeIndexSubmit, activeIndexDetails, selectedInactiveActivities, selectedActiveActivities } = this.state
		const { exercises, double, newValues, inactiveActivities, activeActivities, handleSubmit } = this.props 

		return (
			<Grid>
				{/* Mobile score Form */}
				<Grid.Row only='mobile tablet' stretched>
					<Grid.Column>
						{/* Group of Add/Remove Buttons to add/remove activities from score form for that week*/}
						<Header size='large' textAlign='center'>Select Activities to Add/Remove</Header>						
						<Grid.Row>		
							<AddActivitiesList 
								selectInactiveActivity={this.selectInactiveActivity} 
								inactiveActivities={inactiveActivities} 
								selectedInactiveActivities={selectedInactiveActivities}
								updateActivitiesList={() => this.updateActivitiesList('add')}
							/>
							<RemoveActivitiesList
								selectActiveActivity={this.selectActiveActivity}
								activeActivities={activeActivities}
								selectedActiveActivities={selectedActiveActivities}
								updateActivitiesList={() => this.updateActivitiesList('remove')}
							/>
						</Grid.Row>
						<Header size='large' textAlign='center'>Activities Score Form</Header>
							{exercises.map((exercise, index) => {
									const submitVisible = activeIndexSubmit === index ? true : false
									const detailsVisible = activeIndexDetails === index ? true : false
									let { name, points, units, type } = {...exercise}
									let fieldName = []
									let netChangeValue = netChange(newValues, exercises, type, index)
									let netChangeStyle = netChangeValue[1]
									if (name === double.name) {
										points *= 2
										name = <span>{name}<br/><strong style={{color: 'red'}}>DOUBLE POINTS</strong></span>
									}
									if (type === 'timer') {
										fieldName[0] = 'activities.exercises[' + index + '].value.hr'
										fieldName[1] = 'activities.exercises[' + index + '].value.min'
											points = points + ' per hour'
									} else if (type === 'interval') {
										fieldName = 'activities.exercises[' + index + '].value'
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

									const fieldComponent = type === 'interval' ?
										<Field
											name={fieldName}
											component={NewIntervalExercise}
											units={units}
											onFocus={() => this.toggleVisibilitySubmit(index)}
										/>		
									:
										<Form.Group>
											<Field
												name={fieldName[0]}
												component={NewTimerExercise}
												min={0} 
												max={99}
												onFocus={() => this.toggleVisibilitySubmit(index)}
											/>
											<Field
												name={fieldName[1]}
												component={NewTimerExercise}
												min={0} 
												max={59}
												onFocus={() => this.toggleVisibilitySubmit(index)}
											/>
										</Form.Group>
									return (
										<Sidebar.Pushable as={Segment} key={name}>
											<Sidebar 
												as={Button} 
												type='button' 
												onClick={() => handleSubmit(index, type, exercise.value, newValues[index].value)} 
												animation='overlay' 
												direction='right' 
												style={{width: '100px'}} 
												visible={submitVisible}>
												Submit
											</Sidebar>
											<Sidebar
												as={Segment}
												animation='overlay'
												direction='right'
												style={{width: '200px'}}
												visible={detailsVisible}>
												Details
											</Sidebar>
											<Sidebar.Pusher>
												<Segment>
													<div style={{padding: '10px', fontSize: '1.3em'}}>
														<span onClick={() => this.toggleVisibilityDetails(index)}>{exercise.name}</span> {netChangeValue[0] !== '0' && netChangeValue[0] !== '0 Mins' && 
															<span	style={netChangeStyle}>
																{netChangeValue[0]}
															</span>
														}
													</div>
													<div>
														{fieldComponent}
													</div>
						        		</Segment>
						        	</Sidebar.Pusher>
						        </Sidebar.Pushable>
									)									
						})}
					</Grid.Column>
				</Grid.Row>	
				{/* Computer score Form */}
				<Grid.Row only='computer'>
					<Grid.Column>
						{/* Group of Add/Remove Buttons to add/remove activities from score form for that week*/}
						<Header size='large' textAlign='center'>Select Activities to Add/Remove</Header>						
						<Grid.Row>		
							<AddActivitiesList 
								selectInactiveActivity={this.selectInactiveActivity} 
								inactiveActivities={inactiveActivities} 
								selectedInactiveActivities={selectedInactiveActivities}
								updateActivitiesList={() => this.updateActivitiesList('add')}
							/>
							<RemoveActivitiesList
								selectActiveActivity={this.selectActiveActivity}
								activeActivities={activeActivities}
								selectedActiveActivities={selectedActiveActivities}
								updateActivitiesList={() => this.updateActivitiesList('remove')}
							/>
						</Grid.Row>				

						<Header size='large' textAlign='center'>Activities Score Form</Header>
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
								let netChangeValue = netChange(newValues, exercises, type, index)
								let netChangeStyle = netChangeValue[1]
								if (name === double.name) {
									points *= 2
									name = <span>{name}<br/><strong style={{color: 'red'}}>DOUBLE POINTS</strong></span>
								}
								if (type === 'timer') {
									fieldName[0] = 'activities.exercises[' + index + '].value.hr'
									fieldName[1] = 'activities.exercises[' + index + '].value.min'
									points = points + ' per hour'
								} else if (type === 'interval') {
									fieldName = 'activities.exercises[' + index + '].value'
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
											{exercises[index].value} {units}
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
											{exercises[index].value.hr} Hrs {exercises[index].value.min} Min
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
											{netChangeValue[0]}
										</Table.Cell>
										<Table.Cell>
											<Button 
												type='button'
												onClick={() => handleSubmit(index, type, exercise.value, newValues[index].value)}>
												Submit
											</Button>
						        </Table.Cell>										
									</Table.Row>
								)
							})}	
						</Table.Body>
					</Table>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}


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
			label={field.label}
		/>	
	)										
}

const NewTimerExercise = field => (
	<Form.Input 
	 	{...field.input}
		type='number' 
		label={field.label} 
		labelPosition='right' 
		min={field.min} 
		max={field.max}
	/>	
)

export default Exercises