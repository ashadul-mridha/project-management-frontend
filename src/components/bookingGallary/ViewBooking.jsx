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
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";

// custom components

/**
 * It's a appointment custom component  that takes in a bunch of props and returns a styled appointment component.
 */
const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#DB4C3F",
      borderRadius: "8px",
      padding: "10px",
    }}
  >
    <Typography
      variant="h2"
      color="secondary"
      sx={{
        fontSize: "20px",
        fontWeight: 500,
        marginTop: "10px",
      }}
    >
      {restProps.data.name}
    </Typography>
    <Typography
      variant="h6"
      color="secondary"
      sx={{
        fontWeight: 400,
        marginTop: "5px",
      }}
    >
      Link: {restProps.data?.address}
    </Typography>
    <Typography
      variant="h6"
      color="secondary"
      sx={{
        fontWeight: 400,
        marginTop: "5px",
      }}
    >
      Password: {restProps.data?.place}
    </Typography>
  </Appointments.Appointment>
);

// apointment tooltip custom conent
const AppointmentTooltipContent = ({
  children,
  appointmentData,
  ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={10}>
        <Typography
          variant="h2"
          color="primary"
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            marginTop: "10px",
          }}
        >
          {appointmentData.name}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 400,
            marginTop: "5px",
          }}
        >
          Link: {appointmentData?.address}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 400,
            marginTop: "5px",
          }}
        >
          Password: {appointmentData?.place}
        </Typography>
        <div
          style={{ fontSize: "12px" }}
          dangerouslySetInnerHTML={{ __html: appointmentData?.desc }}
        ></div>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const ViewBooking = () => {
  const [Booking, setBooking] = React.useState([]);

  const { getUser, getToken } = useAuthHooks();
  const { callBooking } = useNavbarContextHooks();

  // get login user role
  const { userRole } = getUser();
  const token = getToken();

  /* data fetch url set by user role. */
  const url =
    userRole === "admin"
      ? `${process.env.REACT_APP_API_KEY}/booking`
      : `${process.env.REACT_APP_API_KEY}/user/booking`;

  /* Fetching data from the server. */
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userRole === "admin") {
        setBooking(res.data.data);
      } else {
        setBooking(res.data.data.bookings);
      }
    };
    fetchData();
  }, [callBooking, token, url, userRole]);

  const today = new Date();

  return (
    <>
      <Paper>
        <Scheduler data={Booking}>
          <ViewState
            defaultCurrentDate={`${today}`}
            defaultCurrentViewName="Week"
          />
          <DayView startDayHour={1} endDayHour={24} />
          <WeekView startDayHour={1} endDayHour={24} />
          <MonthView startDayHour={1} endDayHour={24} />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip
            contentComponent={AppointmentTooltipContent}
            showCloseButton
          />
        </Scheduler>
      </Paper>
    </>
  );
};

export default ViewBooking;
