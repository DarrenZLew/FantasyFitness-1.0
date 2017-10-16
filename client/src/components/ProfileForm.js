import React, { Component } from 'react';
import { Table, Form, Button, Checkbox, Icon, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ProfileFormActions } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../styles/ProfileForm.css';

class ProfileForm extends Component {

	submit = {values} => {
		console.log(values)
	}

	render() {
		console.log(this.props)
		const { handleSubmit, pristine reset submitting, initialValues } = this.props
		return (
			<Form className='container center scoreForm-form' onSubmit = {handleSubmit(this.submit)} >
				<TableUserAttributes userAttributes={this.props.initialValues.user.userAttributes} currValues={initialValues.user.userAttributes}/>
				<TablePreferences preferences={this.props.initialvalues.preferences}/>
				<Button 
					type='button'
					className='profle-reset'
					disabled={pristine || submitting}
					onClick={reset}>
					reset
				</Button>
						<Button 
					type='submit'
					className='profile-submit'
					disabled={pristine || submitting}
					onClick={submit}>
					Submit
				</Button>
			</Form>
		)
	}
}

const TableUserAttributes = ({ userAttributes,currValues }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell width={5}>
					Attribute
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the Attribute to learn more!'
			      hideOnScroll
    			/>
    		</Table.HeaderCell>
				<Table.HeaderCell width={3}>
					Current Value
				</Table.HeaderCell>
				<Table.HeaderCell width={5}>
					New Value
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{userAttributes.map((userAttributes, index) => {
				const { name, type } = {...userAttributes}
				let fieldName = []
				if (type === 'string') {
					fieldName = 'user.userAttributes[' + index + '].value'
				}
				return (
					<Table.Row key={index}>
						<Table.Cell>
							{name}
						</Table.Cell>	
						{type === 'string' && 
						<Table.Cell>
							{currValues[index].value} 
						</Table.Cell>
						}
						{type === 'string' && 
						<Table.Cell>
							<Field
								name={fieldName}
								component={field => {
														return (
															<Form.Input
																{...field.input}
																type='string'
																width={8}
															/>	
														)
													}
											}
								type='string'									
							/>
						</Table.Cell>
						}
						{Type === 'email' &&
						<Table.Cell> 
							{CurrValues[index].value}
						</Table.Cell>
						}
						{type === 'email' &&
						<Table.Cell>
							<Field
								name={fieldName}
								component={field => {
														return (
															<Form.Input
																{...field.input}
																type='email'
																width={8}
															/>
														)
													}
											}
								type='email'
							/>
						</Table.Cell>		
						}
					}
					</Table.Row>
				)
			})}	
		</Table.Body>
	</Table>
)

const TablePreferences = ({ preferences }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell colSpan='2'>
					Setting
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the setting to learn more!'
			      hideOnScroll
    			/>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{preferences.map((preference, index ) => {
				const name = 'user.bonuses[' + index + '].value.'
				const fieldName = {
					'mi': name + 'mi',
					'km': name + 'km'
				}
				return (
					<Table.Row key={preference.name}>
						<Table.Cell width={3}>
							{preference.name}
						</Table.Cell>
						<Table.Cell>	
							<Field name={fieldName.mi} component={preference} type='checkbox' label="mi" />{handleCheckedBox}/>
							<Field name={fieldName.km} component={preference} type='checkbox' label="km" />{handleCheckedBox}/>
						</Table.Cell>
					</Table.Row>
				)
			})}
		</Table.Body>
	</Table>
)
const preference = field => (
	<Checkbox
		{...field.input}
		value={field.input.value ? 'on' : 'off'}
		onChange={(e, { checked }) => field.input.onChange(checked)}
		label={field.label} 		
	/>
)
const mapStateToProps = state => {
	return { 
		initialValues: {
			user: {
				exercises:state.profileForm.user.userAttributes, 
				preferences: state.profileForm.user.preferences
			}
		}
	}
}

const mapDispatchToProps = dispatch => {
  const { saveProfile } = ProfileFormActions;
  return bindActionCreators({ saveProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'profileForm', 
	enableReinitialize: true
})(ScoreForm))