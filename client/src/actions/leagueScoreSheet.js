export const Types = {
  SET_SORT: "SET_SORT",
  LeagueScoreFetchDataSuccess: "LEAGUE_SCORE_FETCH_SUCCESS",
  UpdateWeek: "UPDATE_WEEK"
};

export function sortLeagueScoreSheet(sortKey) {
  return {
    type: Types.SET_SORT,
    sortKey
  };
}

export function leagueScoreFetchDataSuccess(leagueInfo) {
  return dispatch =>
    dispatch({
      type: Types.LeagueScoreFetchDataSuccess,
      payload: {
        success: true,
        leagueActivities: leagueInfo.data.activities,
        activities: leagueInfo.data.user_activities,
        users: leagueInfo.data.users
      }
    });
}

export function leagueScoreFetchData(startDay, endDay) {
  return dispatch => {
    fetch("/league/1/scores", {
      credentials: "same-origin",

      method: "post",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        startDay,
        endDay
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => dispatch(leagueScoreFetchDataSuccess(response)))
      .catch(err => console.log(err));
  };
}

export function updateWeek(week, weekLabel, startDay, endDay) {
  return dispatch => {
    dispatch({
      type: Types.UpdateWeek,
      payload: {
        success: true,
        week,
        weekLabel,
        startDay,
        endDay
      }
    });
    dispatch(leagueScoreFetchData(startDay, endDay));
  };
}
