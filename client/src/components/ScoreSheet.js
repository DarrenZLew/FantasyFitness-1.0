import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';
import { Grid, Segment, Header, Dropdown, Button, Divider } from 'semantic-ui-react';
import { ScoreSheetActions } from '../actions';
import { bindActionCreators } from 'redux';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

class ScoreSheet extends Component {

	state = {
		date: null
	}

	handleSort = e => {
		e.preventDefault()
		if (e.target.id !== 'sortIcon') {
			this.props.sortScoreSheet(e.target.id)
		}
	}

	render() {
		const { users, activity, username, date, league } = this.props
		return (
			<Grid centered columns='equal' container>
				<Grid.Row>
					<Grid.Column>
						<span>Day Mode</span>
						<SingleDatePicker
							date={this.state.date} // momentPropTypes.momentObj or null
							onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
							focused={this.state.focused} // PropTypes.bool
							onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
							showClearDate
							reopenPickerOnClearDate
							numberOfMonths={1}
							isOutsideRange={day => moment(day).isAfter(moment())}
							isDayHighlighted={day => moment(day).isAfter(moment().day("Sunday"))}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Dropdown placeholder='Activities' fluid search selection />
					</Grid.Column>
				</Grid.Row>				
				<Grid.Row>
					<Header as='h1'>
						{activity.name}
					</Header>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Header as='h3'>
							Player Name
						</Header>
					</Grid.Column>
					<Grid.Column>
						<Header as='h3'>
							<span style={{marginRight: '20px'}}>
								Count Value
							</span>
							<Button type='button' style={{float: 'right'}}>
								Switch to Score Value
							</Button>
						</Header>
					</Grid.Column>
				</Grid.Row>
				<Divider />
				<Grid.Row>
					<Grid.Column textAlign='center'>
						<Header as='h4'>
							Your Score
						</Header>
					</Grid.Column>		
				</Grid.Row>
				<Grid.Row style={{padding: 0, marginBottom: '20px'}}>
					<Grid.Column>
						<Segment>
							{username}
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							User's score value needed here
						</Segment>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column textAlign='center'>
						<Header as='h4'>
							League - {league}
						</Header>
					</Grid.Column>
				</Grid.Row>				
				{users.map(user => {
					const { username, amount } = {...user}
					return (
						<Grid.Row columns={2} key={user.id + user.username} style={{padding: 0}}>
							<Grid.Column width={8}>
								<Segment>
									{username}
								</Segment>
							</Grid.Column>
							<Grid.Column width={8}>
								<Segment>
									{amount}
								</Segment>
							</Grid.Column>
						</Grid.Row>
					)
				})}
			</Grid>
		)
	}
}

const mapStateToProps = (state) => {
	return { ...state.scoreSheet }
}	

const mapDispatchToProps = (dispatch) => {
	const { sortScoreSheet } = ScoreSheetActions
	return bindActionCreators({ sortScoreSheet }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreSheet)

				// <div style={{overflowX: 'scroll'}}>
				// 	<Table style={{margin: '2% auto'}} celled size='large' definition textAlign='center'>
				// 			<Table.Header>
				// 				<Table.Row>
				// 					<Table.HeaderCell />
				// 					{activities.map(activity => 
				// 						<Table.HeaderCell 
				// 							key={activity.name} 
				// 							verticalAlign='top'
				// 							onClick={this.handleSort}
				// 							id={activity.name}
				// 						>
				// 							{activity.name}<br />
				// 							{this.props.sort === activity.name && <Icon name='triangle down' id='sortIcon' size='big'/>}
				// 						</Table.HeaderCell>)}
				// 					<Table.HeaderCell onClick={this.handleSort} id='headtohead'>
				// 						Head to Head
				// 						{this.props.sort === 'headtohead' && <Icon name='triangle down' id='sortIcon' size='big'/>}
				// 					</Table.HeaderCell>
				// 					<Table.HeaderCell onClick={this.handleSort} id='total'>
				// 						Total 
				// 						{this.props.sort === 'total' && <Icon name='triangle down' id='sortIcon' size='big'/>}
				// 					</Table.HeaderCell>

				// 				</Table.Row>
				// 				<Table.Row>
				// 					<Table.HeaderCell />
				// 					{activities.map((activity, index) => <Table.HeaderCell key={activity.name + index}>{activity.value}</Table.HeaderCell>)}
				// 					<Table.HeaderCell />
				// 					<Table.HeaderCell />
				// 				</Table.Row>
				// 			</Table.Header>
				// 			<Table.Body>
				// 				{users.map(user => (
				// 					<Table.Row key={user.id}>
				// 						<Table.Cell textAlign='center'>{user.username}</Table.Cell>
				// 							{user.activities.map(activity => {
				// 								if (activity.value.hasOwnProperty('hr')) {
				// 									let hr = activity.value.hr
				// 									let min = activity.value.min
				// 									if (hr < 10) {
				// 										hr = '0' + hr
				// 									}
				// 									if (min < 10) {
				// 										min = '0' + min
				// 									}
				// 									return <Table.Cell key={activity.name}>
				// 													{hr}:{min}
				// 												 </Table.Cell>
				// 								} else {
				// 									return <Table.Cell key={activity.name}>{activity.value}</Table.Cell>
				// 								}
				// 							})}
				// 							<Table.Cell>{user.headtohead}</Table.Cell>
				// 							<Table.Cell>{user.total}</Table.Cell>
				// 					</Table.Row>
				// 				))}
				// 			</Table.Body>
				// 	</Table>
				// </div>