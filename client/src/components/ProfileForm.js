import React from 'react';
import { Table, Form, Button, Checkbox, Icon, Popup } from 'semantic-ui-react';
import '../styles/ProfileForm.css';

const ProfileForm = ({ userAttributes, preferences, handleCheckedBox }) => (
	<Form className='container center scoreForm-form'>
		<TableUserAttributes userAttributes={userAttributes}/>
		<TablePreferences preferences={preferences} handleCheckedBox={handleCheckedBox}/>
		<Button className='profle-reset'>Reset</Button>
		<Button className='profile-submit'>Submit</Button>
	</Form>
)

const TableUserAttributes = ({ userAttributes }) => (
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
				<Table.HeaderCell width={3}>Current Value</Table.HeaderCell>
				<Table.HeaderCell width={5}>New Value</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{userAttributes.map(userAttributes => {
				const { name,value,type } = {...userAttributes}
				return (
					<Table.Row key={name}>
						<Table.Cell>{name}</Table.Cell>	
						{type === 'string' && <Table.Cell><div>{value} </div></Table.Cell>}
						{type === 'string' && <Table.Cell><NewValue value={value} /></Table.Cell>}
					</Table.Row>
				)
			})}	
		</Table.Body>
	</Table>
)

const TablePreferences = ({ preferences, handleCheckedBox }) => (
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
			{preferences.map(preference => {
				const { mi,km } = {...preference}
				return (
					<Table.Row key={preference.name}>
						<Table.Cell width={3}>{preference.name}</Table.Cell>
						<Table.Cell>	
							<Checkbox label='Mi' checked={mi} onChange={handleCheckedBox}/>
							<Checkbox label='KM' checked={km}/>
						</Table.Cell>
					</Table.Row>
				)
			})}
		</Table.Body>
	</Table>
)

const CurrValue = ({ value }) => (<div>{value} </div>)
const NewValue = ({ value }) => (<Form.Input type='text' width={24} defaultValue={value} />)	

export default ProfileForm