import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ScoreFormActions } from '../../actions';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Exercises from './Exercises';
import Challenge from './Challenge';
import Bonuses from './Bonuses';
import ActivitiesDropList from './ActivitiesDropList';

class ScoreForm extends Component {

	render() {
		const { pristine, reset, submitting, initialValues, double } = this.props
		const { updateActivity, addActivity, removeActivity, inactiveActivities, activeActivities, defaultActivities, updateBonus } = this.props

		let newValueExercises, newValueChallenge, newValueBonuses
		if (typeof this.props.formValues !== 'undefined') {
			newValueChallenge = this.props.formValues.challenge
			newValueExercises = this.props.formValues.exercises
			newValueBonuses = this.props.formValues.bonuses			
		}
				// <Challenge challenge={this.props.initialValues.activities.challenge} currValues={initialValues.activities.challenge} newValues={newValueChallenge} />

		return (
		 	<Form className='container center' style={{marginTop: '20px'}} >
				<Header textAlign='center'>Add or Remove Activities</Header>								 	
		 		<ActivitiesDropList 
		 			inactiveActivities={inactiveActivities}
		 			activeActivities={activeActivities}
		 			updateActivity={updateActivity}
		 			addActivity={addActivity}
		 			removeActivity={removeActivity}
		 		/>
		 		<Header size='large' textAlign='center'>Bonuses</Header>
				<Bonuses 
					bonuses={initialValues.activities.bonuses} 
					double={double} 
					handleSubmit={updateBonus} 
				/>
				<Header size='large' textAlign='center'>Activities</Header>
				<Exercises 
					exercises={initialValues.activities.exercises} 
					double={double} 
					newValues={newValueExercises} 
					handleSubmit={updateActivity}
					defaultActivities={defaultActivities}
				/>
			</Form>
		)
	}
}

const mapStateToProps = state => {
	return { 
		initialValues: {
			activities: {
				exercises:state.scoreForm.activities.exercises, 
				bonuses: state.scoreForm.activities.bonuses,
				challenge: state.scoreForm.activities.challenge
			}
		},
		double: state.scoreForm.double,
		inactiveActivities: state.scoreForm.inactiveActivities,
		activeActivities: state.scoreForm.activeActivities,
		defaultActivities: state.scoreForm.defaultActivities,
		formValues: selector(state, 'activities')
	}
}	

const mapDispatchToProps = dispatch => {
  const { updateActivity, addActivity, removeActivity, updateBonus } = ScoreFormActions;
  return bindActionCreators({ updateActivity, addActivity, removeActivity, updateBonus }, dispatch);
}

const selector = formValueSelector('scoreForm')

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'scoreForm', 
	enableReinitialize: true
})(ScoreForm))