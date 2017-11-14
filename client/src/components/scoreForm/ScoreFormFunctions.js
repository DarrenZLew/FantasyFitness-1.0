import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';

export const AddActivitiesList = ({selectInactiveActivity, inactiveActivities, selectedInactiveActivities, updateActivitiesList}) => {
	return (
		<div>
			<Dropdown 
				onChange={selectInactiveActivity}
				placeholder='Inactive Activities' 
				selection
				search
				multiple
				fluid
				noResultsMessage='No More Activities to Add'
				options={inactiveActivities}
				value={selectedInactiveActivities}
			/>
			<Button 
				type='button' 
				style={{width: '100%'}}
				onClick={updateActivitiesList}>
				<Icon name='plus'/>
				Add
			</Button>
		</div>
	)
}

export const RemoveActivitiesList = ({selectActiveActivity, activeActivities, selectedActiveActivities, updateActivitiesList}) => {
	return (
		<div>
			<Dropdown 
				onChange={selectActiveActivity}
				placeholder='Active Activities' 
				selection
				search
				multiple
				fluid
				noResultsMessage='No More Activities to Remove'
				options={activeActivities}
				value={selectedActiveActivities}
			/>
			<Button 
				type='button'
				style={{width: '100%'}}
				onClick={updateActivitiesList}>
				<Icon name='minus'/>
				Remove
			</Button>
		</div>		
	)
}

export const netChange = (newValues, exercises, type, index) => {
	let netChangeValue, netChangeValueStyle
	if (typeof newValues !== 'undefined') {
		if (type === 'timer' && typeof newValues[index] !== 'undefined') {
			let newValueHr = parseFloat(newValues[index].value.hr)
			let newValueMin = parseFloat(newValues[index].value.min)
			if (Number.isNaN(newValueHr)) {
				newValueHr = 0
			}
			if (Number.isNaN(newValueMin)) {
				newValueMin = 0
			}
			const newTotalMin = newValueHr * 60 + newValueMin
			const currTotalMin = exercises[index].value.hr * 60 + exercises[index].value.min
			netChangeValue = Math.abs(newTotalMin - currTotalMin) + ' Mins'
			if (newTotalMin > currTotalMin) {
				netChangeValueStyle = {color: 'green'}
				netChangeValue = '+ ' + netChangeValue
			} else if (newTotalMin < currTotalMin) {
				netChangeValueStyle = {color: 'red'}
				netChangeValue = '- ' + netChangeValue
			} 
		} else if (type === 'interval' && typeof newValues[index] !== 'undefined') {
			netChangeValue = newValues[index].value - exercises[index].value
			netChangeValue = netChangeValue.toFixed(1).replace(/[.]0$/, "")
			if (netChangeValue > 0) {
				netChangeValueStyle = {color: 'green'}
				netChangeValue = '+ ' + netChangeValue
			} else if (netChangeValue < 0) {
				netChangeValueStyle = {color: 'red'}
				netChangeValue = '- ' + Math.abs(netChangeValue)
			}		
		}
	}
	return ([netChangeValue, netChangeValueStyle])		
}
