import { Common } from '../actions';
import fakeData from "../fakeData/common-fakedata.json";

let fake = fakeData.map((week, index, arr) => {
  let label = "Week " + (index + 1);
  let period = (arr[1].startDay - arr[0].startDay) - 1;
  let endDay = (Number(week.startDay) + period).toString();
  return {...week, endDay, label}
});

let initialState = {
  globalSchedule: fake
};

export default (state = initialState, action) => {
  return state;
};
