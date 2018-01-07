import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';
import { ScoreSheetActions } from '../actions';
import { bindActionCreators } from 'redux';

class ScoreSheet extends Component {

	handleSort = e => {
		e.preventDefault()
			if (e.target.id !== 'sortIcon') {
				this.props.sortScoreSheet(e.target.id)
			}
	}

	render() {
		const { activities, users } = this.props
			return (
					<div style={{overflowX: 'scroll'}}>
					<Table style={{margin: '2% auto'}} celled size='large' definition textAlign='center'>
					<Table.Header>
					<Table.Row>
					<Table.HeaderCell />
					{activities.map(activity =>
							<Table.HeaderCell
							key={activity.name}
							verticalAlign='top'
							onClick={this.handleSort}
							id={activity.name}
							>
							{activity.name}<br />
							{this.props.sort === activity.name && <Icon name='triangle down' id='sortIcon' size='big'/>}
							</Table.HeaderCell>)}
					<Table.HeaderCell onClick={this.handleSort} id='headtohead'>
					Head to Head
					{this.props.sort === 'headtohead' && <Icon name='triangle down' id='sortIcon' size='big'/>}
					</Table.HeaderCell>
					<Table.HeaderCell onClick={this.handleSort} id='total'>
					Total
					{this.props.sort === 'total' && <Icon name='triangle down' id='sortIcon' size='big'/>}
					</Table.HeaderCell>

						</Table.Row>
						<Table.Row>
						<Table.HeaderCell />
						{activities.map((activity, index) => <Table.HeaderCell key={activity.name + index}>{activity.value}</Table.HeaderCell>)}
					<Table.HeaderCell />
						<Table.HeaderCell />
						</Table.Row>
						</Table.Header>
						<Table.Body>
						{users.map(user => (
									<Table.Row key={user.id}>
									<Table.Cell textAlign='center'>{user.username}</Table.Cell>
									{user.activities.map(activity => {
																		 if (activity.value.hasOwnProperty('hr')) {
																			 let hr = activity.value.hr
																				 let min = activity.value.min
																				 if (hr < 10) {
																					 hr = '0' + hr
																				 }
																			 if (min < 10) {
																				 min = '0' + min
																			 }
																			 return <Table.Cell key={activity.name}>
																			 {hr}:{min}
																			 </Table.Cell>
																		 } else {
																			 return <Table.Cell key={activity.name}>{activity.value}</Table.Cell>
																		 }
																	 })}
									<Table.Cell>{user.headtohead}</Table.Cell>
										<Table.Cell>{user.total}</Table.Cell>
										</Table.Row>
										))}
					</Table.Body>
						</Table>
						</div>
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
