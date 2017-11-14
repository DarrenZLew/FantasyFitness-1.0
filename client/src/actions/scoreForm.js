export const Types = {
	UpdateActivity: 'FORM_UPDATE_ACTIVITY',
	ResetForm: 'FORM_RESET_FORM',
	AddActivity: 'FORM_ADD_ACTIVITY',
	RemoveActivity: 'FORM_REMOVE_ACTIVITY'
}

export function updateActivity(index, type, initialValue, newValue) {
	return dispatch => dispatch({
		type: Types.UpdateActivity,
		payload: {
			success: true,
			index,
			type,
			initialValue,
			newValue			
		}
	})
}

export function reset() {
	return dispatch => dispatch({
		type: Types.ResetForm
	})
}

export function addActivity(inactiveActivities) {
	return dispatch => dispatch({
		type: Types.AddActivity,
		payload: {
			success: true,
			inactiveActivities
		}
	})
}

export function removeActivity(activeActivities) {
	return dispatch => dispatch({
		type: Types.RemoveActivity,
		payload: {
			success: true,
			activeActivities
		}
	})
}