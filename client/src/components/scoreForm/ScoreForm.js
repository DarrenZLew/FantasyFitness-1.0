import React, { Component } from 'react';
import { Table, Form, Button, Checkbox, Icon, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ScoreFormActions } from '../../actions';
import { Field, reduxForm } from 'redux-form';
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
		return (
		 	<Form className='container center' style={{marginTop: '20px'}} onSubmit={handleSubmit(this.submit)} >
				<Challenge challenge={this.props.initialValues.user.challenge} currValues={initialValues.user.challenge} />
				<Exercises exercises={this.props.initialValues.user.exercises} currValues={initialValues.user.exercises} double={double} />
				<Bonuses bonuses={this.props.initialValues.user.bonuses} double={double} />
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
		double: state.scoreForm.double
	}
}	

const mapDispatchToProps = dispatch => {
  const { score } = ScoreFormActions;
  return bindActionCreators({ score }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'scoreForm', 
	enableReinitialize: true
})(ScoreForm))