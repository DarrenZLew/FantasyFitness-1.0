import React from 'react';
import { Table, Form, Icon, Popup } from 'semantic-ui-react';
import { Field } from 'redux-form';

const Challenge = ({challenge, currValues, newValues}) => {
	let netChange = 'N/A'
	let netChangeStyle = {}
	if (typeof newValues !== 'undefined') {
		netChange = newValues.value - currValues.value
		netChange = netChange.toFixed(1).replace(/[.]0$/, "")
		if (netChange > 0) {
			netChangeStyle = {color: 'green'}
			netChange = '+ ' + netChange
		} else if (netChange < 0) {
			netChangeStyle = {color: 'red'}
			netChange = '- ' + Math.abs(netChange)
		}	
	}
	return (
		<Table selectable size='small'>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell width={3}>
						Challenge Movement
						<Popup
	      			trigger={<Icon name='info circle'/>}
				      content='Click on the challenge to learn more!'
				      hideOnScroll
	    			/>
	    		</Table.HeaderCell>
	    		<Table.HeaderCell width={4}>
	    			Points
	    		</Table.HeaderCell>
					<Table.HeaderCell width={3}>
						Current Value
					</Table.HeaderCell>
					<Table.HeaderCell width={3}>
						New Value
					</Table.HeaderCell>
					<Table.HeaderCell>
						Net Change
					</Table.HeaderCell>				
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>
						{challenge.name}
					</Table.Cell>
					<Table.Cell>
						{challenge.points}
					</Table.Cell> 
					<Table.Cell>
						{currValues.value}
					</Table.Cell>
					<Table.Cell>
						<Field
							name='user.challenge.value'
							component={NewChallenge}
						/>					
					</Table.Cell>
					<Table.Cell style={netChangeStyle}>
						{netChange}
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	)
}

const NewChallenge = field => (
	<Form.Input
		{...field.input}
		type='number' 
		width={8} 
		min={0} 
		max={9999} 
	/>	
)

export default Challenge