import React, { Component } from 'react';
import { Table, Icon, Popup, Button, Grid, Sidebar, Segment } from 'semantic-ui-react';

class Bonuses extends Component {

	state = { activeIndexDetails: -1 }

	toggleVisibilityDetails = activeIndexDetails => {
		activeIndexDetails = activeIndexDetails === this.state.activeIndexDetails ? -1 : activeIndexDetails
		this.setState({ activeIndexDetails })
	}

	// Call action to load initial exercises when component renders
	componentDidMount = () => {
		this.props.activitiesFetchData('20171105','bonus')
	}

	render() {
		const { activeIndexDetails } = this.state
		const { bonuses, double, handleSubmit } = this.props

		return (
			<Grid>
				<Grid.Row only='mobile tablet' stretched>
					<Grid.Column>
						{bonuses.map((bonus, index) => {
							const detailsVisible = activeIndexDetails === index ? true : false
							const { activity, name, value, points } = {...bonus}
							let [submitColor, iconName] = value === 1 ? ['green', 'thumbs up'] : ['red', 'thumbs down']
							return (
								<Sidebar.Pushable
									as={Segment}
									key={name}
									style={{boxShadow: '2px 2px 5px 3px rgba(34,36,38,.15)', border: 'none'}}
								>
									<Sidebar
										as={Button}
										type='button'
										onClick={() => handleSubmit(activity, index, 'bonus', '20171105', value)}
										animation='overlay'
										direction='right'
										style={{width: '100px'}}
										visible={true}
										color={submitColor}
									>
										<Icon name={iconName} size='large' />
									</Sidebar>
									<Sidebar
										as={Segment}
										animation='overlay'
										onClick={() => this.toggleVisibilityDetails()}
										direction='top'
										style={{height: '100px !important'}}
										visible={detailsVisible}>
										<div>{name}</div>
										<div>other links</div>
										<div>weekly total</div>
									</Sidebar>
									<Sidebar.Pusher>
										<Segment style={{height: '100px'}} >
											<div style={{padding: '10px', fontSize: '1.3em'}}>
												<span onClick={() => this.toggleVisibilityDetails(index)}>
													{name}
													{!detailsVisible && <Icon name='caret down' />}
													{detailsVisible && <Icon name='caret right' />}
												</span>
											</div>
											<div style={{padding: '10px'}}>
												Points: {points}
											</div>
										</Segment>
									</Sidebar.Pusher>
								</Sidebar.Pushable>
							)
						})}
					</Grid.Column>
				</Grid.Row>

				<Grid.Row only='computer'>
					<Grid.Column>
						<Table selectable size='small'>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										Daily Bonuses
										<Popup
											trigger={<Icon name='info circle'/>}
											content='Click on the bonus to learn more!'
											hideOnScroll
										/>
									</Table.HeaderCell>
									<Table.HeaderCell>
										Points
									</Table.HeaderCell>
									<Table.HeaderCell>
										Completed?
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{bonuses.map((bonus,index) => {
									const { activity, name, points, value } = {...bonus}
									let complete = value === 1 ?
										<Button type='button' onClick={() => handleSubmit(activity, index, 'bonus', '20171105', value)} color='green'>
											<Icon name='thumbs up' />
										</Button>
										:
										<Button type='button' onClick={() => handleSubmit(activity, index, 'bonus', '20171105', value)} color='red'>
											<Icon name='thumbs down' />
										</Button>
										return (
											<Table.Row key={name}>
												<Table.Cell>
													{name}
												</Table.Cell>
												<Table.Cell>
													{points}
												</Table.Cell>
												<Table.Cell>
													{complete}
												</Table.Cell>
											</Table.Row>)
								})
								}
							</Table.Body>
						</Table>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default Bonuses
