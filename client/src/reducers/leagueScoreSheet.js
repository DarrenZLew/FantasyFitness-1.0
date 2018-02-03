import data from './leagueScoreSheet-fakedata.json';
import { LeagueScoreSheetActions } from '../actions';

const initialState = {
	// Default sort by Total score column
	users: data.users.sort((a,b) => {
		return b.total - a.total
	}),
	activities: data.activities,
	sort: 'total'
}

export default (state = initialState, action) => {
	switch (action.type) {
		// Sorts columns in scoreSheet
		case (LeagueScoreSheetActions.Types.SET_SORT):
			// need to use JSON.parse(JSON.stringify) instead of Object.Assign
			// Object.Assign only does shallow copy
			let newState = JSON.parse(JSON.stringify(state))
				// If the sortKey is an activity name and is in the activities array, sort by the activity value
				let index = newState.users[0].activities.findIndex(i => i.name === action.sortKey)
				if (index !== -1) {
					newState.users.sort((a,b) => {
						if (b.activities[index].value.hr) {
							let bTotalMin = b.activities[index].value.hr * 60 + b.activities[index].value.min
								let aTotalMin = a.activities[index].value.hr * 60 + a.activities[index].value.min
								return bTotalMin - aTotalMin
						}
						return b.activities[index].value - a.activities[index].value
					})
				} else {
					// Head to Head or Total score columns
					let sortKey = action.sortKey.toLowerCase()
						newState.users.sort((a, b) => {
							return b[sortKey] - a[sortKey]
						})
				}
			newState.sort = action.sortKey
				return newState
		default:
				return state
	}
}