import data from './scoreForm-fakedata.json';
import { ScoreFormActions } from '../actions';
import objectAssignDeep from 'object-assign-deep';

const defaultActivities = data.preferences.defaultActivities
let exercises = data.exercises.filter((exercise, index) => defaultActivities.indexOf(data.exercises[index].name) !== -1)
let inactiveActivities = data.scoreForm.inactiveActivities.map(exercise => ({key: exercise, text: exercise, value: exercise }))
let activeActivities = data.scoreForm.activeActivities.map(exercise => ({ key: exercise,	text: exercise, value: exercise }))

const initialState = {
	activities: {
		exercises: exercises,
		bonuses: data.bonuses,
		challenge: data.challenge
	},
	double: data.double,
	inactiveActivities: inactiveActivities,
	activeActivities: activeActivities
}

export default (state = initialState, action) => {
	switch (action.type) {
		case (ScoreFormActions.Types.UpdateActivity):
      if (action.payload.success) {
        const { index, type } = action.payload		
        let { initialValue, newValue } = action.payload
				let newState = objectAssignDeep({}, state)

        if (type === 'interval') {
        	initialValue = parseFloat(initialValue)
        	newValue = parseFloat(newValue)	
					if (initialValue === newValue) {
						// Add a flag for specific exercise saying it was updated, but no change?
						return { ...state }
					}
					newState.activities.exercises[index].value = newValue					
				}	else if (type === 'timer') {
					let initialHr = parseFloat(initialValue.hr)
					let initialMin = parseFloat(initialValue.min)
					let newHr = parseFloat(newValue.hr)
					let newMin = parseFloat(newValue.min)
					if (initialHr === newHr && initialMin === newMin) {
						console.log('same values')
						return state
					}
					newState.activities.exercises[index].value.hr = newHr
					newState.activities.exercises[index].value.min = newMin
				}
				// Add a flag for specific exercise saying it was updated?
				return newState
			}
			return { ...state, updateActivityErrors: action.payload.errors }
		case (ScoreFormActions.Types.AddActivity):
			if (action.payload.success) {
				const { inactiveActivities } = action.payload
				let newState = Object.assign({}, state)

				inactiveActivities.map(activity => {
					const index = newState.inactiveActivities.findIndex(inactiveActivity => inactiveActivity.value === activity)
					if (index !== -1) {
						newState.inactiveActivities.splice(index, 1)
						newState.activeActivities.push({ key: activity, text: activity, value: activity })	
						const exercises = data.exercises.filter(exercise => exercise.name === activity)
						newState.activities.exercises = newState.activities.exercises.concat(exercises)						
					}
				})
				return newState
			}
		case (ScoreFormActions.Types.RemoveActivity):
			if (action.payload.success) {
				const { activeActivities } = action.payload
				let newState = objectAssignDeep({}, state)
				activeActivities.map(activity => {
					const index = newState.activeActivities.findIndex(activeActivity => activeActivity.value === activity)
					if (index !== -1) {
						newState.activeActivities.splice(index, 1)
						newState.inactiveActivities.push( {key: activity, text: activity, value: activity })	
						const exerciseIndex = newState.activities.exercises.findIndex(exercise => exercise.name === activity)
						newState.activities.exercises.splice(exerciseIndex, 1)					
					}
				})
				return newState
			}
		default:
			return state	
	}
}