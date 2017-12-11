import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ScoreFormActions } from '../../actions';
import { connect } from 'react-redux';
import Exercises from './Exercises';
import Challenge from './Challenge';
import Bonuses from './Bonuses';
import ActivitiesDropList from './ActivitiesDropList';

class ScoreForm extends Component {

	render() {
		const { double, activities } = this.props
		const { updateActivity, activityListSubmitData, inactiveActivities, activeActivities, defaultActivities, updateBonus, activitiesFetchData, activitiesSubmitData, activitiesListFetchData } = this.props
				// <Challenge challenge={this.props.initialValues.activities.challenge} currValues={initialValues.activities.challenge} newValues={newValueChallenge} />

		return (
		 	<Form className='container center' style={{marginTop: '20px'}} >
				<Header textAlign='center'>Add or Remove Activities</Header>								 	
		 		<ActivitiesDropList 
		 			inactiveActivities={inactiveActivities}
		 			activeActivities={activeActivities}
		 			updateActivity={updateActivity}
		 			activityListSubmitData={activityListSubmitData}
		 		/>
		 		<Header size='large' textAlign='center'>Bonuses</Header>
	 			<Bonuses 
					bonuses={activities.bonuses} 
					double={double} 
					handleSubmit={activitiesSubmitData}
					activitiesFetchData={activitiesFetchData}
				/>
				<Header size='large' textAlign='center'>Activities</Header>
				<Exercises 
					exercises={activities.exercises} 
					double={double} 
					handleSubmit={activitiesSubmitData}
					defaultActivities={defaultActivities}
					activitiesFetchData={activitiesFetchData}
					updateActivity={updateActivity}
					activitiesListFetchData={activitiesListFetchData}
				/>
			</Form>
		)
	}
}

const mapStateToProps = state => {
	return { 
		activities: {
			exercises:state.scoreForm.activities.exercises, 
			bonuses: state.scoreForm.activities.bonuses,
			challenge: state.scoreForm.activities.challenge
		},
		double: state.scoreForm.double,
		inactiveActivities: state.scoreForm.inactiveActivities,
		activeActivities: state.scoreForm.activeActivities,
		defaultActivities: state.scoreForm.defaultActivities,
	}
}	

const mapDispatchToProps = dispatch => {
  const { updateActivity, activityListSubmitData, updateBonus, activitiesFetchData, activitiesSubmitData, activitiesListFetchData } = ScoreFormActions;
  return bindActionCreators({ updateActivity, activityListSubmitData, updateBonus, activitiesFetchData, activitiesSubmitData, activitiesListFetchData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreForm)