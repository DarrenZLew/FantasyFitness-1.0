import { ScoreFormActions } from "../actions";

let initialState = {
  activities: {
    exercises: [],
    bonuses: [],
    challenge: []
  },
  double: "",
  inactiveActivities: [],
  activeActivities: [],
  defaultActivities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ScoreFormActions.Types.UpdateActivity:
      if (action.payload.success) {
        let newState = JSON.parse(JSON.stringify(state));
        const { index, type, submitData, newValue, source } = action.payload;
        if (source === "exercise") {
          switch (type) {
            case "interval":
              // newValue = parseFloat(newValue)
              newState.activities.exercises[index].value = newValue;
              // update initial value to be new value if submitting data to server, else keep initial value the same
              if (submitData) {
                newState.activities.exercises[index].initialValue = newValue;
              }
              return newState;

            // update hr or minute values when using individual input fields
            case "hr":
            case "min":
              newState.activities.exercises[index].value[type] = parseFloat(
                newValue
              );
              if (submitData) {
                newState.activities.exercises[index].initialValue[
                  type
                ] = parseFloat(newValue);
              }
              return newState;

            // update both hr and minute input fields when submitting data
            case "timer":
              if (submitData) {
                newState.activities.exercises[index].initialValue.hr =
                  newValue.hr;
                newState.activities.exercises[index].initialValue.min =
                  newValue.min;
              }
              return newState;

            default:
              return state;
          }
        } else if (source === "bonus") {
          let newState = JSON.parse(JSON.stringify(state));
          newState.activities.bonuses[index].value =
            newState.activities.bonuses[index].value === 1 ? null : 1;
          return newState;
        }
      }
    case ScoreFormActions.Types.AddActivity:
      if (action.payload.success) {
        let { inactiveActivity, activity, id } = action.payload;
        let newState = JSON.parse(JSON.stringify(state));
        const idx = newState.inactiveActivities.findIndex(
          inactive => inactive.value === inactiveActivity
        );
        if (idx !== -1) {
          newState.inactiveActivities.splice(idx, 1);
          newState.activeActivities.push({
            key: id,
            text: inactiveActivity,
            value: inactiveActivity
          });
          if (activity.type === "timer") {
            const min = activity.amount % 60;
            const hr = Math.floor(activity.amount / 60);
            activity = Object.assign({}, activity, {
              value: {
                hr: hr,
                min: min
              },
              initialValue: {
                hr: hr,
                min: min
              }
            });
          } else {
            activity = Object.assign({}, activity, {
              value: activity.amount,
              initialValue: activity.amount
            });
          }
          newState.activities.exercises = newState.activities.exercises.concat(
            activity
          );
        }
        return newState;
      }
    case ScoreFormActions.Types.RemoveActivity:
      if (action.payload.success) {
        console.log("helo");
        const { activeActivity, id } = action.payload;
        let newState = JSON.parse(JSON.stringify(state));
        const idx = newState.activeActivities.findIndex(
          active => active.value === activeActivity
        );
        if (idx !== -1) {
          newState.activeActivities.splice(idx, 1);
          newState.inactiveActivities.push({
            key: id,
            text: activeActivity,
            value: activeActivity
          });
          const index = newState.activities.exercises.findIndex(
            e => e.name === activeActivity
          );
          if (index !== -1) {
            newState.activities.exercises.splice(index, 1);
          }
        }
        return newState;
      }
    case ScoreFormActions.Types.ActivitiesFetchDataSuccess:
      if (action.payload.success) {
        // individual user activity scores
        const userActivities = action.payload.activities.data.user_activities;
        const activities = action.payload.activities.data.activities;
        let newState = JSON.parse(JSON.stringify(state));
        let newExercises = [];
        let newBonuses = [];
        // Update initial values of activity to newly submitted value
        activities.forEach(activity => {
          // Check if the user has record of the activity in the league
          let currActIndex = userActivities.findIndex(
            currAct => currAct.activity === activity.id
          );
          if (currActIndex !== -1 && userActivities[currActIndex].active) {
            if (activity.source === "exercise") {
              if (activity.type === "timer") {
                const min = userActivities[currActIndex].amount % 60;
                const hr = Math.floor(userActivities[currActIndex].amount / 60);
                const newValues = {
                  value: { hr, min },
                  initialValue: { hr, min }
                };
                newExercises.push({
                  ...activity,
                  value: { hr, min },
                  initialValue: { hr, min }
                });
              } else {
                newExercises.push({
                  ...activity,
                  value: userActivities[currActIndex].amount,
                  initialValue: userActivities[currActIndex].amount
                });
              }
            } else if (activity.source === "bonus") {
              // bonus is complete/true
              newBonuses.push({
                ...activity,
                value: userActivities[currActIndex].amount
              });
            }
          }
        });
        newState.activities.exercises = newExercises;
        newState.activities.bonuses = newBonuses;
        return newState;
      }
    case ScoreFormActions.Types.ActivitiesListFetchDataSuccess:
      if (action.payload.success) {
        const activities = action.payload.activities.data;
        let newState = JSON.parse(JSON.stringify(state));
        let activeActivities = activities.filter(
          exercise => exercise.active === true || exercise.active === null
        );
        activeActivities = activeActivities.map(exercise => ({
          key: exercise.activity,
          text: exercise.name,
          value: exercise.name
        }));
        let inactiveActivities = activities.filter(
          exercise => exercise.active === false
        );
        inactiveActivities = inactiveActivities.map(exercise => ({
          key: exercise.activity,
          text: exercise.name,
          value: exercise.name
        }));
        newState.activeActivities = activeActivities;
        newState.inactiveActivities = inactiveActivities;
        return newState;
      }
    default:
      return state;
  }
};
