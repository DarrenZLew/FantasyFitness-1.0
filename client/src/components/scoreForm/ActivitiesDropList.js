import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { AddActivitiesList, RemoveActivitiesList } from './ScoreFormFunctions';

class ActivitiesDropList extends Component {

	state = { selectedInactiveActivities: [], selectedActiveActivities: [], inactiveActivitiesIndexes: [], activeActivitiesIndexes: [] }

	// Updates from add dropdown list for currently selected inactive activities
	selectInactiveActivity = (e, { value }) => {
		let ids = value.map(activity => {
			let id = this.props.inactiveActivities.findIndex(e => e.value === activity)
				return this.props.inactiveActivities[id].key
		})
		this.setState({
			selectedInactiveActivities: value,
			inactiveActivitiesIndexes: ids
		})
	}

	// Updates from remove dropdown list for currently selected active activities
	selectActiveActivity = (e, { value }) => {
		let ids = value.map(activity => {
			let id = this.props.activeActivities.findIndex(e => e.value === activity)
				return this.props.activeActivities[id].key
		})
		this.setState({
			selectedActiveActivities: value,
			activeActivitiesIndexes: ids
		})
	}

	// Function used to call action creator functions addActivity/removeActivity with currently selected inactive/active activities from droplist.
	// Resets selected inactive/active activities afterwards
	updateActivitiesList = updateFunction => {
		if (updateFunction === 'add') {
			this.props.activityListSubmitData(this.state.selectedInactiveActivities, this.state.inactiveActivitiesIndexes, '20171105', 'add')
		} else if (updateFunction === 'remove') {
			this.props.activityListSubmitData(this.state.selectedActiveActivities, this.state.activeActivitiesIndexes, '20171105', 'remove')
		}
		this.setState({
			selectedInactiveActivities: [],
			selectedActiveActivities: [],
			selectedInactiveActivitiesIndexes: [],
			selectedActiveActivitiesIndexes: []
		})
	}

	render() {
		const { inactiveActivities, activeActivities } = this.props
			const { selectedInactiveActivities, selectedActiveActivities } = this.state

			return (
					// Group of Add/Remove Buttons to add/remove activities from score form for that week
					<div>
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
					</div>
				   )
	}
}

export default ActivitiesDropList;
