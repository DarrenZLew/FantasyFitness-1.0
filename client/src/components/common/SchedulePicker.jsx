import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "semantic-ui-react";

export const SchedulePickerGroup = ({ schedule, week, updateWeek }) => {
  const handleSchedule = (event, { value }, e) =>
    updateWeek(value, e.label, e.startDay, e.endDay);

  const scheduleGroup = schedule.map(e => {
    return (
      <Radio
        key={e.week}
        label={e.label}
        name="schedulePickerGroup"
        value={e.week}
        checked={week === e.week}
        onChange={(event, data) => handleSchedule(event, data, e)}
      />
    );
  });

  return (
    <Form>
      <Form.Group inline>{scheduleGroup}</Form.Group>
    </Form>
  );
};

SchedulePickerGroup.propTypes = {
  schedule: PropTypes.array,
  week: PropTypes.number,
  updateWeek: PropTypes.func
};
