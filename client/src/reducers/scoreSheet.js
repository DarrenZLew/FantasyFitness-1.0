import data from './scoreSheet-fakedata.json';

export default state => {
	state = {
		users: data.users,
		activities: data.activities
	}
	return state	
}