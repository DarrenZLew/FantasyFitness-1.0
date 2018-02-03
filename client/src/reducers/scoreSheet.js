import data from './scoreSheet-fakedata.json';
import { ScoreSheetActions } from '../actions';

const activityList = data.activities.map(activity => ({key: activity.name, text: activity.name, value: activity.name}))
const indexActivity = data.users[0].activities.findIndex(activity => activity.name === data.currentActivity.name)

let usersData = JSON.parse(JSON.stringify(data.users))
usersData.map(user => {
	if (user.activities[indexActivity].amount.hasOwnProperty('hr')) {
		let hr = user.activities[indexActivity].amount.hr
		let min = user.activities[indexActivity].amount.min
		user.activityAmountMin = hr * 60 + min
		if (hr < 10) {
			hr = '0' + hr
		}
		if (min < 10) {
			min = '0' + min
		}
		user.activityAmount = hr + ':' + min
	} else {
		user.activityAmount = user.activities[indexActivity].amount
	}
})

if (data.view === 'score') {
	usersData.map(user => {
		if (user.hasOwnProperty('activityAmountMin')) {
			user.activityAmount = user.activityAmountMin / 60 * data.currentActivity.points
			user.activityAmountMin = undefined
		} else {
			user.activityAmount = user.activityAmount * data.currentActivity.points
		}
	})
}

const indexUser = usersData.findIndex(user => user.username === data.username)
const currentUserAmount = usersData[indexUser].activityAmount

const initialState = {
	users: usersData.sort((a,b) => {
		if (a.hasOwnProperty('activityAmountMin') && a.activityAmountMin !== undefined) {
			return b.activityAmountMin - a.activityAmountMin
		}
		return b.activityAmount - a.activityAmount
	}),
	currentUser: {
		name: data.username,
		amount: currentUserAmount
	},
	league: data.league,
	currentActivity: {
		name: data.currentActivity.name,
		points: data.currentActivity.points
	},
	activityList
}

export default (state = initialState, action) => {
	switch (action.type) {
		case (ScoreSheetActions.Types.UpdateActivity):
			if (action.payload.success) {
				let newState = JSON.parse(JSON.stringify(state))
				const indexActivity = data.users[0].activities.findIndex(activity => activity.name === action.payload.activity)
				newState.users.map(user => {
					if (user.activities[indexActivity].amount.hasOwnProperty('hr')) {
						let hr = user.activities[indexActivity].amount.hr
						let min = user.activities[indexActivity].amount.min
						user.activityAmountMin = hr * 60 + min
						if (hr < 10) {
							hr = '0' + hr
						}
						if (min < 10) {
							min = '0' + min
						}
						user.activityAmount = hr + ':' + min
					} else {
						user.activityAmount = user.activities[indexActivity].amount
						if (user.hasOwnProperty('activityAmountMin')) {
							user.activityAmountMin = undefined
						}
					}
				})
				
				const indexUser = newState.users.findIndex(user => user.username === newState.currentUser.name)
				newState.currentActivity = {
					name: action.payload.activity,
					points: data.activities[indexActivity].value
				}

				if (data.view === 'score') {
					newState.users.map(user => {
						if (user.hasOwnProperty('activityAmountMin')) {
							user.activityAmount = user.activityAmountMin / 60 * newState.currentActivity.points
							user.activityAmountMin = undefined
						} else {
							user.activityAmount = user.activityAmount * newState.currentActivity.points
						}
					})
				}

				newState.currentUser.amount = newState.users[indexUser].activityAmount
				
				newState.users.sort((a,b) => {
					if (a.hasOwnProperty('activityAmountMin') && a.activityAmountMin !== undefined) {
						return b.activityAmountMin - a.activityAmountMin
					}
					return b.activityAmount - a.activityAmount					
				})

				return newState 
			}
		case (ScoreSheetActions.Types.UpdateScoreView):
			if (action.payload.success) {
				let newState = JSON.parse(JSON.stringify(state))
				if (action.payload.view === 'score') {
					newState.users.map(user => {
						if (user.hasOwnProperty('activityAmountMin')) {
							user.activityAmount = user.activityAmountMin / 60 * newState.currentActivity.points
							user.activityAmountMin = undefined
						} else {
							user.activityAmount = user.activityAmount * newState.currentActivity.points
						}
					})
				} else if (action.payload.view === 'count') {
					newState.users.map(user => {
						if (user.hasOwnProperty('activityAmountMin') && user.activityAmountMin === undefined) {
							user.activityAmountMin = user.activityAmount * 60 / newState.currentActivity.points 							
							let hr = user.activityAmountMin / 60
							let min = user.activityAmountMin % 60
							if (hr < 10) {
								hr = '0' + hr
							}
							if (min < 10) {
								min = '0' + min
							}
							user.activityAmount = hr + ':' + min
						} else {
							user.activityAmount = user.activityAmount / newState.currentActivity.points
						}
					})
				}
				
				const indexUser = newState.users.findIndex(user => user.username === newState.currentUser.name)
				newState.currentUser.amount = newState.users[indexUser].activityAmount
				
				return newState 				
			}
		default:
			return state
	}
	return state
}
