import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';
import { Grid, Segment, Header, Dropdown, Button, Divider, Form, Radio } from 'semantic-ui-react';
import { ScoreSheetActions } from '../actions';
import { bindActionCreators } from 'redux';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { SchedulePickerGroup } from './common';

class ScoreSheet extends Component {

	state = {
		date: moment(),
		datePickerGroup: 'day',
		week: 'Week 1',
		view: 'count'
	}

	handleActivityListChange = (e, { value }) => {
		this.props.updateActivity(value)
		this.setState({ activityValue: value })
	}

	handleDatePickerGroup = (e, { value }) => this.setState({ datePickerGroup: value })

	handleSchedulePickerGroup = (e, { value }) => this.setState({ schedulePickerGroup: value })

	handleScoreView = () => {
		const view = this.state.view === 'count' ? 'score' : 'count'
		this.props.updateScoreView(view)
		this.setState({ view })
	}

	render() {
		const { users, currentActivity, currentUser, date, league, activityList } = this.props
		const { activityValue } = this.state

		const schedule = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']

		return (
			<Grid centered columns='equal' container>
				<Grid.Row>
					<Grid.Column>
						<DatePickerGroup date={this.state.datePickerGroup} handleDatePickerGroup={this.handleDatePickerGroup} />
						{this.state.datePickerGroup === 'day' &&
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
								hideKeyboardShortcutsPanel
							/>
						}
						{this.state.datePickerGroup === 'week' &&
							<SchedulePickerGroup
								schedule={schedule}
								week={this.state.week}
								handleSchedulePickerGroup={this.handleSchedulePickerGroup}
							/>
						}

					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Header as='h4' style={{marginBottom: '5px'}}>Activities List</Header>
						<Dropdown
							placeholder='Activities'
							fluid
							search
							selection
							options={activityList}
							onChange={this.handleActivityListChange}
							value={activityValue}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Button type='button' onClick={this.handleScoreView}>
							{this.state.view === 'count' && <span>Switch to Score</span>}
							{this.state.view === 'score' && <span>Switch to Count</span>}
						</Button>
					</Grid.Column>
				</Grid.Row>
				<Divider />
				<Grid.Row>
					<Header as='h1'>
						{currentActivity.name}
					</Header>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column textAlign='center'>
						<Header as='h3'>
							Player Name
						</Header>
					</Grid.Column>
					<Grid.Column textAlign='center'>
						<Header as='h3'>
							{this.state.view === 'count' && <span>Count</span>}
							{this.state.view === 'score' && <span>Score</span>}
						</Header>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Header as='h4'>
							Your Score
						</Header>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row style={{padding: 0, marginBottom: '20px'}}>
					<Grid.Column>
						<Segment>
							{currentUser.name}
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							{currentUser.amount}
						</Segment>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Header as='h4'>
							{league}
						</Header>
					</Grid.Column>
				</Grid.Row>
				{users.map(user => {
					const { username, activityAmount } = {...user}
					return (
						<Grid.Row columns={2} key={user.id + user.username} style={{padding: 0}}>
							<Grid.Column width={8}>
								<Segment>
									{username}
								</Segment>
							</Grid.Column>
							<Grid.Column width={8}>
								<Segment>
									{activityAmount}
								</Segment>
							</Grid.Column>
						</Grid.Row>
					)
				})}
			</Grid>
		)
	}
}

const	DatePickerGroup = ({date, handleDatePickerGroup}) => (
	<Form>
		<Form.Group inline>
			<Form.Field>
				<Radio
					label='Day'
					name='datePickerGroup'
					value='day'
					checked={date === 'day'}
					onChange={handleDatePickerGroup}
				/>
			</Form.Field>
			<Form.Field>
				<Radio
					label='Week'
					name='datePickerGroup'
					value='week'
					checked={date === 'week'}
					onChange={handleDatePickerGroup}
				/>
			</Form.Field>
		</Form.Group>
	</Form>
)

const mapStateToProps = (state) => {
	return { ...state.scoreSheet }
}

const mapDispatchToProps = (dispatch) => {
	const { updateActivity, updateScoreView } = ScoreSheetActions
	return bindActionCreators({ updateActivity, updateScoreView }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreSheet)
