export const Types = {
	UpdateActivity: 'FORM_UPDATE_ACTIVITY',
	AddActivity: 'FORM_ADD_ACTIVITY',
	RemoveActivity: 'FORM_REMOVE_ACTIVITY',
	ActivitiesFetchDataSuccess: 'FORM_FETCH_ACTIVITIES_SUCCESS',
	ActivitiesListFetchDataSuccess: 'FORM_FETCH_ACTIVITIESLIST_SUCCESS'
}

export function activityListSubmitData(activities, ids, date, action) {
	return dispatch => {
		// TODO: this can be null, right?
		// TODO: this should be an each, yeah? Test to make sure
		//activities.each((activity, index) => {
		activities.map((activity, index) => {
			let active = action === 'add' ? true : false
				fetch('/user/1/activitylist/record', {
					credentials: 'same-origin',
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
				.then((response) => dispatch(updateActivityList(date, activities, action, ids[index])))
				.catch((err) => console.log(err))
		})
	}
}

export function updateActivityList(date, activities, action, activity) {
	return dispatch => {
		fetch('/user/1/activitylist', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				day: date,
				activity
			})
		})
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) => response.json())
			.then((response) => {
				let activityIndex = activities.indexOf(response.data[0].name)
					if (action === 'add') {
						return dispatch({
							type: Types.AddActivity,
							payload: {
								success: true,
								inactiveActivity: activities[activityIndex],
								activity: response.data[0],
								id: activity
							}
						})
					} else if (action === 'remove') {
						return dispatch({
							type: Types.RemoveActivity,
							payload: {
								success: true,
								activeActivity: activities[activityIndex],
								id: activity
							}
						})
					}
			})
		.catch((err) => console.log(err))
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

export function activitiesFetchDataSuccess(activities) {
	return dispatch => dispatch({
		type: Types.ActivitiesFetchDataSuccess,
		payload: {
			success: true,
			activities
		}
	})
}

export function activitiesFetchData(date, source) {
	return dispatch => {
		fetch('/user/1/activity', {
			credentials: 'same-origin',

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
		.then(response => response.json())
		.then(response => dispatch(activitiesFetchDataSuccess(response)))
		.catch(err => console.log(err))
	};
}

export function activitiesSubmitData(id, index, source, date, initialValue, newValue, type) {
	let amount = parseFloat(newValue);
	if (isNaN(amount)) {
		amount = 0;
	};
	if (source === 'exercise') {
		// convert timer amounts from hr/min to mins
		if (type === 'timer') {
			if (newValue.hr === null || isNaN(newValue.hr)) {
				newValue.hr = 0;
			} else if (newValue.min === null || isNaN(newValue.min)) {
				newValue.min = 0;
			}
			amount = newValue.hr * 60 + newValue.min;
		}
	} else if (source === 'bonus') {
		// 1 is complete and null is incomplete for bonuses in database
		amount = 1;
		if (initialValue === 1) {
			amount = null;
		}
	}

	return dispatch => {
		// don't send a request to server if no change to record when submitting
		if (source === 'bonus' || initialValue !== amount) {
			fetch('/user/1/activity/record', {
				method: 'post',
				credentials: 'same-origin',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					activity: id,
					day: date,
					amount
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

export function activitiesListFetchData(date, source) {
	return dispatch => {
		fetch('/user/1/activitylist', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				day: date,
				source
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
			.catch((err) => {
				// the idea is to redirect to login if something went wrong.
				// TODO: make less wrong
				document.querySelector('a[to="/login"]').click();
				console.log(err)
			});
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
