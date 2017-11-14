import React, { Component } from 'react';
import { Form, Button} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ScoreFormActions } from '../../actions';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Exercises from './Exercises';
import Challenge from './Challenge';
import Bonuses from './Bonuses';

class ScoreForm extends Component {

	render() {
		const { pristine, reset, submitting, initialValues, double, inactiveActivities, activeActivities } = this.props
		const { updateActivity, addActivity, removeActivity } = this.props
		let newValueExercises, newValueChallenge, newValueBonuses
		if (typeof this.props.formValues !== 'undefined') {
			newValueChallenge = this.props.formValues.challenge
			newValueExercises = this.props.formValues.exercises
			newValueBonuses = this.props.formValues.bonuses			
		}
				// <Challenge challenge={this.props.initialValues.activities.challenge} currValues={initialValues.activities.challenge} newValues={newValueChallenge} />
				// <Bonuses bonuses={this.props.initialValues.activities.bonuses} double={double} newValues={newValueBonuses} />

		return (
		 	<Form className='container center' style={{marginTop: '20px'}} >
				<Exercises 
					exercises={initialValues.activities.exercises} 
					double={double} 
					newValues={newValueExercises} 
					handleSubmit={updateActivity}
					addActivity={addActivity} 
					removeActivity={removeActivity}
					inactiveActivities={inactiveActivities}
					activeActivities={activeActivities}
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
		formValues: selector(state, 'activities')
	}
}	

const mapDispatchToProps = dispatch => {
  const { updateActivity, addActivity, removeActivity } = ScoreFormActions;
  return bindActionCreators({ updateActivity, addActivity, removeActivity }, dispatch);
}

const selector = formValueSelector('scoreForm')

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'scoreForm', 
	enableReinitialize: true
})(ScoreForm))