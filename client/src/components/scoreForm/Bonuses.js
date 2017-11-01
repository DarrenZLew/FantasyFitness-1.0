import React from 'react';
import { Table, Form, Icon, Popup, Checkbox } from 'semantic-ui-react';
import { Field } from 'redux-form';

const Bonuses = ({ bonuses }) => (
	<Table selectable size='small'>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>
					Daily Bonuses
					<Popup
      			trigger={<Icon name='info circle'/>}
			      content='Click on the bonus to learn more!'
			      hideOnScroll
    			/>
				</Table.HeaderCell>
				<Table.HeaderCell>
					Points
				</Table.HeaderCell>
				<Table.HeaderCell></Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{bonuses.map((bonus, index) => {
				const name = 'user.bonuses[' + index + '].value.'
				const fieldName = {
					'mo': name + 'mo',
					'tu': name + 'tu',
					'we': name + 'we',
					'th': name + 'th',
					'fr': name + 'fr',
					'sa': name + 'sa',
					'su':	name + 'su'
				}
				return (
					<Table.Row key={bonus.name}>
						<Table.Cell width={3}>
							{bonus.name}
						</Table.Cell>
						<Table.Cell width={2}>
							{bonus.points} per day
						</Table.Cell>
						<Table.Cell>
							<Field name={fieldName.mo} component={Bonus} type='checkbox' label='Mon' />	
							<Field name={fieldName.tu} component={Bonus} type='checkbox' label='Tue' />	
							<Field name={fieldName.we} component={Bonus} type='checkbox' label='Wed' />	
							<Field name={fieldName.th} component={Bonus} type='checkbox' label='Thurs' />	
							<Field name={fieldName.fr} component={Bonus} type='checkbox' label='Fri' />	
							<Field name={fieldName.sa} component={Bonus} type='checkbox' label='Sat' />	
							<Field name={fieldName.su} component={Bonus} type='checkbox' label='Sun' />	
						</Table.Cell>
					</Table.Row>
				)
			})}
		</Table.Body>
	</Table>
)

const Bonus = field => (
	<Checkbox
		{...field.input}
		value={field.input.value ? 'on' : 'off'}
		onChange={(e, { checked }) => field.input.onChange(checked)}
		label={field.label}
		style={{marginLeft: '50px'}}
	/>
)

export default Bonuses