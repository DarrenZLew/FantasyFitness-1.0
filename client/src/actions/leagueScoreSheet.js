export const Types = {
	SET_SORT: 'SET_SORT'
}

export function sortLeagueScoreSheet(sortKey) {
	return {
		type: Types.SET_SORT,
		sortKey
	}
}