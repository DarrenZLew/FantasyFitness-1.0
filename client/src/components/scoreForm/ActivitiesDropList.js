import React, { Component } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { AddActivitiesList, RemoveActivitiesList } from './ScoreFormFunctions';

class ActivitiesDropList extends Component {	

	state = { selectedInactiveActivities: [], selectedActiveActivities: [] }

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
		const { inactiveActivities, activeActivities } = this.props
		const { updateActivity, addActivity, removeActivity } = this.props
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