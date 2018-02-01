export const Types = {
	UpdateActivity: 'UPDATE_ACTIVITY',
	UpdateScoreView: 'UPDATE_SCORE_VIEW'
}

export function updateActivity(activity) {
	return dispatch => dispatch({
		type: Types.UpdateActivity,
		payload: {
			success: true,
			activity
		}
	})
}

export function updateScoreView(view) {
	return dispatch => dispatch({
		type: Types.UpdateScoreView,
		payload: {
			success: true,
			view
		}
	})
}
