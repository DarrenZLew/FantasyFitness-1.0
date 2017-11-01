import React, { Component } from 'react';
import { Table, Form, Button, Icon, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { ProfileFormActions } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../styles/ProfileForm.css';

class ProfileForm extends Component {

	submit = (values) => {
		console.log(values)
	}
    render() {
		const { handleSubmit, pristine, reset, submitting, initialValues } = this.props
		return (
			<Form className='container center profileForm-form' onSubmit={handleSubmit(this.submit)} >
				<TableUserAttributes userAttributes={this.props.initialValues.user.userAttributes} currValues={initialValues.user.userAttributes}/>
				<Button 
					type='button'
					className='profle-reset'
					disabled={pristine || submitting}
					onClick={reset}>
					Reset
				</Button>
				<Button 
					type='submit'
					className='profile-submit'
					disabled={pristine || submitting}>
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
				const { name, fieldtype } = {...userAttributes}
				let fieldName = 'user.userAttributes[' + index + '].value'
				let fieldFormatText = ""
				// if (fieldtype==='TextArea') {
				// 	fieldFormatText=(field,fieldtype) => {
				// 		return (
				// 						<Form.TextArea
				// 							{...field.input}
				// 							type={fieldtype}
				// 						/>	
				// 					)
				// 				}
				// }
				// else {
				// 	console.log(fieldtype)
				// 	fieldFormatText=(field,fieldtype) => {
				// 		return (
				// 						<Form.Input
				// 							{...field.input}
				// 							type={fieldtype}
				// 						/>	
				// 					)
				// 				}
				// }				
				return (
					<Table.Row key={index}>
						<Table.Cell>
					 		{name}
						</Table.Cell> 
						<Table.Cell>
							{currValues[index].value} 
						</Table.Cell>
						{fieldtype === 'TextArea' && 
							<Table.Cell>
								<Field
									name={fieldName}
									component={ProfileFieldTextArea}
									type={fieldtype}									
								/>
							</Table.Cell>
						}
						{fieldtype !== 'TextArea' &&
							<Table.Cell>
								<Field
									name={fieldName}
									component={ProfileFieldInput}
									type={fieldtype}									
								/>
							</Table.Cell>
						}						 
				</Table.Row>
				)
			})}	
		</Table.Body>
	</Table>
)

const ProfileFieldInput = field => (
	<Form.Input
		{...field.input}
		type={field.type}
	/>	
)

const ProfileFieldTextArea = field => (
	<Form.TextArea
		{...field.input}
		type={field.type}
	/>	
)

const mapStateToProps = state => {
	return { 
		initialValues: {
			user: {
				userAttributes:state.profileForm.user.userAttributes
			}
		}
	}
}

const mapDispatchToProps = dispatch => {
  const { saveProfile } = ProfileFormActions;
  return bindActionCreators({ saveProfile }, dispatch);}


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'profileForm', 
	enableReinitialize: true
})(ProfileForm))