export const Types = {
	UpdateForm: 'FORM_UPDATE_FORM',
	ResetForm: 'FORM_RESET_FORM',
}

export function update() {
	return dispatch => dispatch({
		type: Types.UpdateForm
	})
}

export function reset() {
	return dispatch => dispatch({
		type: Types.ResetForm
	})
}