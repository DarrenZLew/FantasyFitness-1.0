export const Types = {
	// OnChangeActivity: 'FORM_UPDATE_ONCHANGE_ACTIVITY',
	UpdateActivity: 'FORM_UPDATE_ACTIVITY',
	AddActivity: 'FORM_ADD_ACTIVITY',
	RemoveActivity: 'FORM_REMOVE_ACTIVITY',
	ActivitiesFetchDataSuccess: 'FORM_FETCH_ACTIVITIES_SUCCESS', 
	ActivitiesListFetchDataSuccess: 'FORM_FETCH_ACTIVITIESLIST_SUCCESS'
}

export function activityListSubmitData(activities, ids, date, action) {
	return dispatch => {
		let apiRequests = []
		activities.map((activity, index) => {
			let active = action === 'add' ? true : false
			let apiRequest = fetch('http://localhost:5001/user/1/activitylist/record', {
				method: 'post',
				headers: {
					"Content-Type": "application/json" 
				},
			  body: JSON.stringify({
			    activity: ids[index],
			    day: date,
			    active
			  })
			})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())	
			.then((response) => dispatch(updateActivityList(activities, ids, action)))
			.catch((err) => console.log(err))

			apiRequests.push(apiRequest)
		})
		return Promise.all(apiRequests)
	}
}

export function updateActivityList(activities, ids, action) {
	if (action === 'add') {
		return dispatch => dispatch({
			type: Types.AddActivity,
			payload: {
				success: true,
				inactiveActivities: activities,
				ids
			}
		})
	} else if (action === 'remove') {
		return dispatch => dispatch({
			type: Types.RemoveActivity,
			payload: {
				success: true,
				activeActivities: activities,
				ids
			}
		})
	}
}

export function updateActivity(source, index, type, initialValue, newValue, submitData) {
	return dispatch => dispatch({
		type: Types.UpdateActivity,
		payload: {
			success: true,
			source,
			index,
			type,
			initialValue,
			newValue,
			submitData			
		}
	})
}

export function activitiesFetchDataSuccess(activities, source) {
	console.log(activities)
	return dispatch => dispatch({
		type: Types.ActivitiesFetchDataSuccess,
		payload: {
			success: true,
			activities: activities,
			source: source
		}
	})
}

export function activitiesFetchData(date, source) {
	return dispatch => {
		fetch('http://localhost:5001/user/1/activity', {
					method: 'post',
					headers: {
						"Content-Type": "application/json" 
					},
				  body: JSON.stringify({
				    day: date,
				    source: source
				  })
			})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())		
			.then((response) => dispatch(activitiesFetchDataSuccess(response, source)))
			.catch((err) => console.log(err))
	};
}

export function activitiesSubmitData(id, index, source, date, initialValue, newValue, type) {
	let amount = parseFloat(newValue)
	if (isNaN(amount)) {
		amount = 0
	}
	if (source === 'exercise') {
		// convert timer amounts from hr/min to mins
		if (type === 'timer') {
			if (newValue.hr === null || isNaN(newValue.hr)) {
				newValue.hr = 0
			} else if (newValue.min === null || isNaN(newValue.min)) {
				newValue.min = 0
			}
			amount = newValue.hr * 60 + newValue.min
		}		
	} else if (source === 'bonus') {
		// 0 is complete and null is incomplete for bonuses in database
		amount = 0
		if (initialValue === 0) {
			amount = null
		}
	}

	return dispatch => {
		// don't send a request to server if no change to record when submitting
		if (source === 'bonus' || initialValue !== amount) {
			fetch('http://localhost:5001/user/1/activity/record', {
				method: 'post',
				headers: {
					"Content-Type": "application/json" 
				},
			  body: JSON.stringify({
			    activity: id,
			    day: date,
			    amount: amount
			  })
			})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((activities) => dispatch(updateActivity(source, index, type, initialValue, newValue, true)))
			.catch((err) => console.log(err))
		};				
	}
}

export function activitiesListFetchData(date) {
	return dispatch => {
		fetch('http://localhost:5001/user/1/activitylist', {
				method: 'post',
				headers: {
					"Content-Type": "application/json" 
				},
			  body: JSON.stringify({
			    day: date
			  })					
			})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())		
			.then((response) => dispatch(activitiesListFetchDataSuccess(response)))
			.catch((err) => console.log(err))
	};
}

export function activitiesListFetchDataSuccess(activities) {
	return dispatch => dispatch({
		type: Types.ActivitiesListFetchDataSuccess,
		payload: {
			success: true,
			activities: activities
		}
	})	
}