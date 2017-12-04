import data from './scoreForm-fakedata.json';
import { ScoreFormActions } from '../actions';

const defaultActivities = data.preferences.defaultActivities
let exercises = data.exercises.filter((exercise, index) => defaultActivities.indexOf(data.exercises[index].name) !== -1)
// let inactiveActivities = data.scoreForm.inactiveActivities.map(exercise => ({key: exercise, text: exercise, value: exercise }))
// let activeActivities = data.scoreForm.activeActivities.map(exercise => ({ key: exercise,	text: exercise, value: exercise }))

let initialState = {
	activities: {
		exercises: [],
		bonuses: [],
		challenge: []
	},
	double: '',
	inactiveActivities: [],
	activeActivities: [],
	defaultActivities: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case (ScoreFormActions.Types.UpdateActivity):
      if (action.payload.success) {
				let newState = JSON.parse(JSON.stringify(state))
				const { index, type, submitData, newValue } = action.payload	
				if (action.payload.source === 'exercise') {
	        	
					switch (type) {
						case 'interval':
		        	// newValue = parseFloat(newValue)	
							newState.activities.exercises[index].value = newValue	
							// update initial value to be new value if submitting data to server, else keep initial value the same
							if (submitData) {
								newState.activities.exercises[index].initialValue = newValue										
							}
							return newState
						// update hr or minute values when using individual input fields
						case 'hr':
						case 'min':
							newState.activities.exercises[index].value[type] = parseFloat(newValue)
							if (submitData) {
								newState.activities.exercises[index].initialValue[type] = parseFloat(newValue)					
							}
							return newState
						// update both hr and minute input fields when submitting data	
						case 'timer':														
							if (submitData) {
								newState.activities.exercises[index].initialValue.hr = newValue.hr
								newState.activities.exercises[index].initialValue.min = newValue.min						
							}
							return newState
						default:
							return state
					}					
				} else if (action.payload.source === 'bonus') {
					let newState = JSON.parse(JSON.stringify(state))
					newState.activities.bonuses[index].value = newState.activities.bonuses[index].value === 0 ? null : 0
					return newState 					
				}
			}
		case (ScoreFormActions.Types.AddActivity):
			if (action.payload.success) {
				const { inactiveActivities, ids } = action.payload
				let newState = Object.assign({}, state)

				inactiveActivities.map((activity,index) => {
					const idx = newState.inactiveActivities.findIndex(inactiveActivity => inactiveActivity.value === activity)
					if (idx !== -1) {
						newState.inactiveActivities.splice(idx, 1)
						newState.activeActivities.push({ key: ids[index], text: activity, value: activity })	
						// const exercises = data.exercises.filter(exercise => exercise.name === activity)
						// newState.activities.exercises = newState.activities.exercises.concat(exercises)						
					}
				})
				console.log(newState)
				return newState
			}
		case (ScoreFormActions.Types.RemoveActivity):
			if (action.payload.success) {
				const { activeActivities } = action.payload
				let newState = JSON.parse(JSON.stringify(state))
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
		case (ScoreFormActions.Types.ActivitiesFetchDataSuccess):
			if (action.payload.success) {
				// individual user activity scores
				const activities = action.payload.activities.data
				let newState = JSON.parse(JSON.stringify(state))
				// Update initial values of activity to newly submitted value
				let newActivities = activities.map(activity => {
					if (activity.source === 'exercise') {
						if (activity.type === 'timer') {
							const min = activity.amount % 60
							const hr = Math.floor(activity.amount / 60) 
							const newValues = {
								value: {
									hr: hr,
									min: min
								},
								initialValue: {
									hr: hr,
									min: min
								}
							}
							return Object.assign({}, activity, newValues)
						}
						return Object.assign({}, activity, {
							value: activity.amount,
							initialValue: activity.amount
						})						
					} else if (activity.source === 'bonus') {
						// bonus is complete/true
						return Object.assign({}, activity, {value: activity.amount})
					}
				}
			)
				if (action.payload.source === 'exercise') {
					newState.activities.exercises = newActivities			
				} else if (action.payload.source === 'bonus') {
					newState.activities.bonuses = newActivities
				}
				return newState
			}
		case (ScoreFormActions.Types.ActivitiesListFetchDataSuccess):
			if (action.payload.success) {
				let newState = JSON.parse(JSON.stringify(state))
				let activeActivities = action.payload.activities.data.filter(exercise => exercise.active === true)
				activeActivities = activeActivities.map(exercise => ({ key: exercise.id,	text: exercise.name, value: exercise.name }))
				let inactiveActivities = action.payload.activities.data.filter(exercise => exercise.active === false)
				inactiveActivities = inactiveActivities.map(exercise => ({ key: exercise.id,	text: exercise.name, value: exercise.name }))
				newState.activeActivities = activeActivities
				newState.inactiveActivities = inactiveActivities
				return newState
			}
		default:
			return state	
	}
}