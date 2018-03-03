import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { LeagueScoreSheetActions, Common } from "../actions";
import { bindActionCreators } from "redux";
import { SchedulePickerGroup } from "./common";

class LeagueScoreSheet extends Component {
  componentDidMount = () => {
    this.props.leagueScoreFetchData(
      this.props.schedule.startDay,
      this.props.schedule.endDay
    );
  };

  render() {
    const {
      activities,
      users,
      leagueActivities,
      schedule,
      updateWeek,
      globalSchedule
    } = this.props;
    return (
      <div style={{ height: "100vh", overflowX: "scroll" }}>
        <SchedulePickerGroup
          schedule={globalSchedule}
          week={schedule.week}
          updateWeek={updateWeek}
        />
        <Table
          style={{ margin: "2% auto" }}
          celled
          size="large"
          definition
          textAlign="center"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              {leagueActivities.map(activity => (
                <Table.HeaderCell
                  key={activity.name}
                  verticalAlign="top"
                  id={activity.name}
                >
                  {activity.name}
                  <br />
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell id="total">
                Total
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell />
              {leagueActivities.map((activity, index) => (
                <Table.HeaderCell key={activity.name + index}>
                  {activity.points}
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell textAlign="center">{user.name}</Table.Cell>
                {user.activities.map(activity => {
                  if (activity.type === "timer") {
                    let hr = Math.floor(activity.amount / 60);
                    let min = activity.amount % 60;
                    hr = hr < 10 ? "0" + hr : hr;
                    min = min < 10 ? "0" + min : min;
                    return (
                      <Table.Cell key={activity.name}>
                        {hr}:{min}
                      </Table.Cell>
                    );
                  } else {
                    return (
                      <Table.Cell key={activity.name}>
                        {activity.amount}
                      </Table.Cell>
                    );
                  }
                })}
                <Table.Cell>{user.total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.leagueScoreSheet,
    ...state.common
  };
};

const mapDispatchToProps = dispatch => {
  const {
    sortLeagueScoreSheet,
    leagueScoreFetchData,
    updateWeek
  } = LeagueScoreSheetActions;
  return bindActionCreators(
    {
      sortLeagueScoreSheet,
      leagueScoreFetchData,
      updateWeek
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueScoreSheet);
