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
	
	submit = (values) => {
		console.log(values)
	}

	render() {
		const { handleSubmit, pristine, reset, submitting, initialValues, double } = this.props
		let newValueExercises, newValueChallenge, newValueBonuses
		if (typeof this.props.formValues !== 'undefined') {
			newValueChallenge = this.props.formValues.challenge
			newValueExercises = this.props.formValues.exercises
			newValueBonuses = this.props.formValues.bonuses			
		}

		return (
		 	<Form className='container center' style={{marginTop: '20px'}} onSubmit={handleSubmit(this.submit)} >
				<Challenge challenge={this.props.initialValues.user.challenge} currValues={initialValues.user.challenge} newValues={newValueChallenge} />
				<Exercises exercises={this.props.initialValues.user.exercises} currValues={initialValues.user.exercises} double={double} newValues={newValueExercises} />
				<Bonuses bonuses={this.props.initialValues.user.bonuses} currValues={initialValues.user.bonuses} double={double} newValues={newValueBonuses} />
				<Button 
					type='button' 
					className='exercise-reset' 
					disabled={pristine || submitting} 
					onClick={reset}>
					Reset
				</Button>
				<Button 
					type='submit' 
					className='exercise-submit' 
					disabled={pristine || submitting}>
					Submit
				</Button>
			</Form>
		)
	}
}

const mapStateToProps = state => {
	return { 
		initialValues: {
			user: {
				exercises:state.scoreForm.user.exercises, 
				bonuses: state.scoreForm.user.bonuses,
				challenge: state.scoreForm.user.challenge
			}
		},
		double: state.scoreForm.double,
		formValues: selector(state, 'user')
	}
}	

const mapDispatchToProps = dispatch => {
  const { score } = ScoreFormActions;
  return bindActionCreators({ score }, dispatch);
}

const selector = formValueSelector('scoreForm')

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'scoreForm', 
	enableReinitialize: true
})(ScoreForm))