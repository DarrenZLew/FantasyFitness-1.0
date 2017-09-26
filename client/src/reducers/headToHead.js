import fakeData from './headToHeadFakeData.json';

const initialState = {
  user: 'Sanda',
  matchups: fakeData,
}

export default (state = initialState, action) => {
  return state;
}