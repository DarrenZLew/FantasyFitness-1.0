export const Types = {
	UpdateActivity: 'FORM_UPDATE_ACTIVITY',
	ResetForm: 'FORM_RESET_FORM',
	AddActivity: 'FORM_ADD_ACTIVITY',
	RemoveActivity: 'FORM_REMOVE_ACTIVITY',
	UpdateBonus: 'FORM_UPDATE_BONUS',
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

export function updateBonus(index) {
	return dispatch => dispatch({
		type: Types.UpdateBonus,
		payload: {
			success: true,
			index
		}
	})
}