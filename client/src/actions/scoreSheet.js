export const Types = {
	SET_SORT: 'SET_SORT'
}

export function sortScoreSheet(sortKey) {
	return {
		type: Types.SET_SORT,
		sortKey
	}
}
