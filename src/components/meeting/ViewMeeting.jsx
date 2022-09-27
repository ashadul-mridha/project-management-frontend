import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Grid } from "@mui/material";

// const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-11-01T08:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
  {
    startDate: "2022-09-27T12:00",
    endDate: "2022-09-27T13:30",
    title: "Drik Website Design",
  },
  {
    startDate: "2022-09-27T10:00",
    endDate: "2022-09-27T10:30",
    title: "Decode Lab",
  },
];

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const ViewMeeting = () => {
    return (
      <>
        <Paper>
          <Scheduler data={schedulerData}>
            <ViewState
              defaultCurrentDate="2018-11-01"
              defaultCurrentViewName="Week"
            />
            <DayView startDayHour={9} endDayHour={24} />
            <WeekView startDayHour={9} endDayHour={24} />
            <MonthView startDayHour={9} endDayHour={24} />

            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip contentComponent={Content} showCloseButton />
          </Scheduler>
        </Paper>
      </>
    );
};

export default ViewMeeting;
