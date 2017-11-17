import React, { Component } from 'react';
import { Table, Form, Icon, Popup, Grid, Segment, Sidebar, Button, Dropdown, Header, Item } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { netChange, pointsAppendUnits, fieldNameFormat, doublePoints, favoriteActivity } from './ScoreFormFunctions';

class Exercises extends Component {

	state = { activeIndexSubmit: -1, activeIndexDetails: -1 } 

	toggleVisibilitySubmit = activeIndexSubmit => {this.setState({ activeIndexSubmit, activeIndexDetails: -1 })}

	toggleVisibilityDetails = activeIndexDetails => {
		activeIndexDetails = activeIndexDetails === this.state.activeIndexDetails ? -1 : activeIndexDetails
		this.setState({ activeIndexDetails, activeIndexSubmit: -1})
	}

	render() {
		const { activeIndexSubmit, activeIndexDetails } = this.state
		const { exercises, double, newValues, handleSubmit, defaultActivities } = this.props 

		return (
			<Grid>
				{/* Mobile score Form */}
				<Grid.Row only='mobile tablet' stretched>
					<Grid.Column>
						{exercises.map((exercise, index) => {
							const submitVisible = activeIndexSubmit === index ? true : false
							const detailsVisible = activeIndexDetails === index ? true : false
							let { name, points, units, type } = {...exercise}
							let [netChangeValue, netChangeStyle] = netChange(newValues, exercises, type, index)
							let fieldName = []
							let favorite = favoriteActivity(name, defaultActivities)
					
							if (type === 'timer') {
								fieldName[0] = 'activities.exercises[' + index + '].value.hr'
								fieldName[1] = 'activities.exercises[' + index + '].value.min'		
							} else if (type === 'interval') {
								fieldName = 'activities.exercises[' + index + '].value'		
							}								
							[points, name] = doublePoints(name, double, points)
							points = pointsAppendUnits(points, type, units)

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
								<Sidebar.Pushable 
									as={Segment} 
									key={name}
									style={{boxShadow: '2px 2px 5px 3px rgba(34,36,38,.15)', border: 'none'}}
								>
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
										<div>
											{favorite} Favorited
										</div>
										<div>
											Point Value: {points}
										</div>
										<div>
											Other stuff - links?
										</div>
										<div>
											Week's Total:  
										</div>
									</Sidebar>
									<Sidebar.Pusher>
										<Segment>
											<div style={{padding: '10px', fontSize: '1.3em'}}>
												<span onClick={() => this.toggleVisibilityDetails(index)}>
													{exercise.name} 
													{!detailsVisible && <Icon name='caret down' />}
													{detailsVisible && <Icon name='caret right' />}
												</span> 
												{netChangeValue !== '0' && netChangeValue !== '0 Mins' && 
													<span	style={netChangeStyle}>
														{netChangeValue}
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
									<Table.HeaderCell>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{exercises.map((exercise, index) => {
									let { name, points, units, type } = {...exercise}
									let [netChangeValue, netChangeStyle] = netChange(newValues, exercises, type, index)
									let fieldName = []
									let favorite = favoriteActivity(name, defaultActivities)
									if (type === 'timer') {
										fieldName[0] = 'activities.exercises[' + index + '].value.hr'
										fieldName[1] = 'activities.exercises[' + index + '].value.min'		
									} else if (type === 'interval') {
										fieldName = 'activities.exercises[' + index + '].value'		
									}								
									[points, name] = doublePoints(name, double, points)
									points = pointsAppendUnits(points, type, units)
			
									return (
										<Table.Row key={index}>
											<Table.Cell>
												{favorite} {name} 
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
												{netChangeValue}
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