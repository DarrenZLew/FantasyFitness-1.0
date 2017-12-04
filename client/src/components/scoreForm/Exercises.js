import React, { Component } from 'react';
import { Table, Form, Icon, Popup, Grid, Segment, Sidebar, Button } from 'semantic-ui-react';
// import { Field } from 'redux-form';
import { netChange, pointsAppendUnits, doublePoints, favoriteActivity } from './ScoreFormFunctions';

class Exercises extends Component {

	state = { activeIndexSubmit: -1, activeIndexDetails: -1 } 

	toggleVisibilitySubmit = (activeIndexSubmit) => {
		this.setState({ activeIndexSubmit, activeIndexDetails: -1 })}

	toggleVisibilityDetails = activeIndexDetails => {
		activeIndexDetails = activeIndexDetails === this.state.activeIndexDetails ? -1 : activeIndexDetails
		this.setState({ activeIndexDetails, activeIndexSubmit: -1})
	}

	// Call action to load initial exercises when component renders
	componentDidMount = () => {
		this.props.activitiesFetchData('20171105','exercise')
		this.props.activitiesListFetchData('20171105')		
	}

	render() {
		const { activeIndexSubmit, activeIndexDetails } = this.state
		const { exercises, double, handleSubmit, defaultActivities } = this.props 

		return (
			<Grid>
				{/* Mobile score Form */}
				<Grid.Row only='mobile tablet' stretched>
					<Grid.Column>
						{exercises.map((exercise, index) => {
							const submitVisible = activeIndexSubmit === index ? true : false
							const detailsVisible = activeIndexDetails === index ? true : false
							let { activity, name, points, units, type, initialValue, value } = {...exercise}
							initialValue = initialValue || (type === "interval" ? 0 : {hr: 0, min: 0});
							let [netChangeValue, netChangeStyle] = netChange(exercises, type, index)
							let favorite = favoriteActivity(name, defaultActivities)													
							let [formatPoints, formatName] = doublePoints(name, double, points)
							formatPoints = pointsAppendUnits(formatPoints, type, units)

							let step
							switch (units) {
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

							let activityInput = type === 'interval' ?
								<Form.Input
									type='number'
									defaultValue={initialValue} 
									width={8} 
									min={0} 
									max={9999}
									step={step}
									onChange={(e) => this.props.updateActivity('exercise', index, type, initialValue, e.target.value)}
									onFocus={() => this.toggleVisibilitySubmit(index)}
								/>							
							:
								<Form.Group>
									<Form.Input 
										type='number'
										defaultValue={initialValue.hr} 
										min={0} 
										max={99}
										onChange={(e) => this.props.updateActivity('exercise', index, 'hr', initialValue, e.target.value)}
										onFocus={() => this.toggleVisibilitySubmit(index)}
									/>
									<Form.Input 
										type='number'
										defaultValue={initialValue.min} 
										min={0} 
										max={59}
										onChange={(e) => this.props.updateActivity('exercise', index, 'min', initialValue, e.target.value)}
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
										onClick={() => handleSubmit(activity, index, 'exercise', '20171105', initialValue, value, type)} 
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
											Favorited
										</div>
										<div>
											Point Value: {formatPoints}
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
													{name} 
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
												{activityInput}
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
									let { activity, name, initialValue, points, units, type } = {...exercise}
									let [netChangeValue, netChangeStyle] = netChange(exercises, type, index)
									let favorite = favoriteActivity(name, defaultActivities)							
									let [formatPoints, formatName] = doublePoints(name, double, points)
									initialValue = initialValue || (type === "interval" ? 0 : {hr: 0, min: 0});
									formatPoints = pointsAppendUnits(formatPoints, type, units)
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
												{initialValue} {units}
											</Table.Cell>
											}
											{type === 'interval' && 
											<Table.Cell>
												<Form.Input
													type='number'
													defaultValue={initialValue} 
													width={8} 
													min={0} 
													max={9999}
													onChange={(e) => this.props.updateActivity(index, type, initialValue, e.target.value)}
													onFocus={() => this.toggleVisibilitySubmit(index)}
												/>	
											</Table.Cell>
											}
											{type === 'timer' && 
											<Table.Cell>
												{initialValue.hr} Hrs {initialValue.min} Min
											</Table.Cell>
											}
											{type === 'timer' && 
											<Table.Cell>
												<Form.Group>
													<Form.Input 
														type='number'
														defaultValue={initialValue.hr} 
														min={0} 
														max={99}
														label='Hrs'
														onChange={(e) => this.props.updateActivity(index, 'hr', initialValue, e.target.value)}
														onFocus={() => this.toggleVisibilitySubmit(index)}
													/>
													<Form.Input 
														type='number'
														defaultValue={initialValue.min} 
														min={0} 
														max={59}
														label='Mins'
														onChange={(e) => this.props.updateActivity(index, 'min', initialValue, e.target.value)}
														onFocus={() => this.toggleVisibilitySubmit(index)}
													/>
												</Form.Group>
											</Table.Cell>}
											<Table.Cell style={netChangeStyle}>
												{netChangeValue}
											</Table.Cell>
											<Table.Cell>
												<Button 
													type='button'
													onClick={() => handleSubmit(activity, index, 'exercise', '20171105', exercise.initialValue, exercise.value, type)} 
												>													
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

export default Exercises