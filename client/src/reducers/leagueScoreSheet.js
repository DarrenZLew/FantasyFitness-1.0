// import data from '../fakeData/leagueScoreSheet-fakedata.json';
import { LeagueScoreSheetActions } from "../actions";
import { round } from "../utils/round";

const initialState = {
  users: [],
  leagueActivities: [],
  activities: [],
  schedule: {
    week: 1,
    weekLabel: "Week 1",
    startDay: "20171105",
    endDay: "20171111"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LeagueScoreSheetActions.Types.LeagueScoreFetchDataSuccess:
      if (action.payload.success) {
        const { leagueActivities, activities, users } = action.payload;
        let newState = JSON.parse(JSON.stringify(state));
        let newActivities = leagueActivities.map(activity => ({
          name: activity.name,
          id: activity.id,
          type: activity.type
        }));
        let newUsers = users.map(user => {
          let total = 0;
          let userActivities = newActivities.map(activity => {
            let amount = 0;
            activities.forEach((e, index) => {
              if (e.activity === activity.id && user.id === e.user) {
                amount += activities[index].amount;
                if (activity.type === "timer") {
                  total +=
                    round(amount / 60, 2) *
                    leagueActivities[activities[index].activity - 1].points;
                } else {
                  total +=
                    amount *
                    leagueActivities[activities[index].activity - 1].points;
                }
              }
            });
            return {
              name: activity.name,
              amount,
              type: activity.type
            };
          });
          return {
            ...user,
            activities: userActivities,
            total
          };
        });
        newState = {
          ...newState,
          leagueActivities,
          users: newUsers
        };
        return newState;
      }
    case LeagueScoreSheetActions.Types.UpdateWeek:
      if (action.payload.success) {
        const { week, weekLabel, startDay, endDay } = action.payload;
        const schedule = {
          week,
          weekLabel,
          startDay,
          endDay
        };
        return { ...state, schedule };
      }
    default:
      return state;
  }
};
