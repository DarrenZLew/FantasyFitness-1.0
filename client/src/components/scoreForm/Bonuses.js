import React from 'react';
import { Table, Icon, Popup, Checkbox } from 'semantic-ui-react';
import { Field } from 'redux-form';

const Bonuses = ({ bonuses, double, newValues }) => (
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
				let { name, points } = {...bonus}
				if (name === double.name) {
					points *= 2
					name = <span>{name}<br/><strong style={{color: 'red'}}>DOUBLE POINTS</strong></span>
				}	
				const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				let style = days.map(day => ({marginLeft: '50px', padding: '10px'}))
				const fieldDay = bonus.value.map((currDayValue, indexDay) => {
					const fieldName = 'user.bonuses[' + index + '].value[' + indexDay + ']'
					if (typeof newValues !== 'undefined') {
						const newDayValue = newValues[index].value[indexDay]
						if ((currDayValue === true && newDayValue !== true) || (currDayValue === "" && newDayValue === true)) {
							style[indexDay] = Object.assign({}, style[indexDay], {backgroundColor: 'yellow'})
						}	
					}
					return (
						<Field name={fieldName} component={Bonus} type='checkbox' key={fieldName} label={days[indexDay]} style={style[indexDay]} /> 
					)
				})
				return (
					<Table.Row key={bonus.name}>
						<Table.Cell width={3}>
							{name}
						</Table.Cell>
						<Table.Cell width={2}>
							{points} per day
						</Table.Cell>
						<Table.Cell>
							{fieldDay}
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
		style={field.style}
	/>
)

export default Bonuses