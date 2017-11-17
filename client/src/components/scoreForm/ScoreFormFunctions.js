import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';

// Function to add activities to dropdown list
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

// Function to remove activities from dropdown list
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

// Function to display netChange values
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
	return [netChangeValue, netChangeValueStyle]		
}

// Function to display double points
export const doublePoints = (name, double, points) => {
	if (name === double.name) {
		points *= 2
		name = <span>{name}<br/><strong style={{color: 'red'}}>DOUBLE POINTS</strong></span>
	}
	return [points, name]
}

// Function to append units to points value
export const pointsAppendUnits = (points, type, units) => {
	if (type === 'timer') {
		points = points + ' per hour'
	} else if (type === 'interval') {
		switch(units) {
			case 'Miles':
				points = points + ' per mile'
				break
			case 'Meters':
				points = points + ' per meter'
				break
			case 'Kilometers':
				points = points + ' per kilometer'
				break
			default:
				break
		}
	}
	return points
}

export const favoriteActivity = (name, defaultActivities) => {
	if (defaultActivities.indexOf(name) !== -1) {
		return <Icon name='star' color='yellow'/>	
	}		
}