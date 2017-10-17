import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

class ScoreSheet extends Component {
	render() {
		const { activities, users } = this.props
		return (
			<div style={{overflowX: 'scroll'}}>
				<Table style={{width: '80%', margin: '2% auto'}} celled size='large' definition textAlign='center' unstackable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell />
								{activities.map(activity => <Table.HeaderCell key={activity.name} verticalAlign='top'>
																							{activity.name}<br />
																						</Table.HeaderCell>)}
								<Table.HeaderCell>Head to Head</Table.HeaderCell>
								<Table.HeaderCell>Total</Table.HeaderCell>
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
												return <Table.Cell key={activity.name}>
																{activity.value.hr + ' Hrs '}<br /> 
																{activity.value.min + ' Mins'}<br />
															 </Table.Cell>
											} else {
												return <Table.Cell key={activity.name}>{activity.value}</Table.Cell>
											}
										})}
										<Table.Cell>{user.head2head}</Table.Cell>
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

export default connect(mapStateToProps)(ScoreSheet)