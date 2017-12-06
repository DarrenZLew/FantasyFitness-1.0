import { ScoreFormActions } from '../actions';

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
					newState.activities.bonuses[index].value = newState.activities.bonuses[index].value === 1 ? null : 1
					return newState 					
				}
			}
		case (ScoreFormActions.Types.AddActivity):
			if (action.payload.success) {
				let { inactiveActivity, activity, id } = action.payload
				let newState = JSON.parse(JSON.stringify(state))
				const idx = newState.inactiveActivities.findIndex(inactive => inactive.value === inactiveActivity)
				if (idx !== -1) {
					newState.inactiveActivities.splice(idx, 1)
					newState.activeActivities.push({ key: id, text: inactiveActivity, value: inactiveActivity })
					if (activity.type === 'timer') {
						const min = activity.amount % 60
						const hr = Math.floor(activity.amount / 60)
						activity = Object.assign({}, activity, {
							value: {
								hr: hr,
								min: min
							},
							initialValue: {
								hr: hr,
								min: min
							}
						})
					} else {
						activity = Object.assign({}, activity, {
							value: activity.amount,
							initialValue: activity.amount
						})
					}
					newState.activities.exercises = newState.activities.exercises.concat(activity)
				}
				return newState
			}
		case (ScoreFormActions.Types.RemoveActivity):
			if (action.payload.success) {
				const { activeActivity, id } = action.payload
				let newState = JSON.parse(JSON.stringify(state))
				const idx = newState.activeActivities.findIndex(active => active.value === activeActivity)
				if (idx !== -1) {
					newState.activeActivities.splice(idx, 1)
					newState.inactiveActivities.push({ key: id, text: activeActivity, value: activeActivity })
					const index = newState.activities.exercises.findIndex(e => e.name === activeActivity)
					if (index !== -1) {
						newState.activities.exercises.splice(index, 1)
					}
				}
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
						return Object.assign({}, activity, {value: activity.amount || null})
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
				const activities = action.payload.activities.data
				let newState = JSON.parse(JSON.stringify(state))
				let activeActivities = activities.filter(exercise => exercise.active === true || exercise.active === null)
				activeActivities = activeActivities.map(exercise => ({ key: exercise.activity,	text: exercise.name, value: exercise.name }))
				let inactiveActivities = activities.filter(exercise => exercise.active === false)
				inactiveActivities = inactiveActivities.map(exercise => ({ key: exercise.activity,	text: exercise.name, value: exercise.name }))
				newState.activeActivities = activeActivities
				newState.inactiveActivities = inactiveActivities
				return newState
			}
		default:
			return state	
	}
}