import { Box } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import useAuthHooks from '../../utils/hooks/useAuth';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import ViewHeader from '../ViewHeader';
import BookingCard from './BookingCard';


  const headerData = {
    name: "All Meeting",
  };

const AllBooking = () => {

  const [bookings , setBookings] = useState([]);
 
  const { getUser, getToken } = useAuthHooks();
  const { callMeeting } = useNavbarContextHooks();

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
        setBookings(res.data.data);
      } else {
        setBookings(res.data.data.bookings);
      }
    };
    fetchData();
  }, [callMeeting, token, url, userRole]);

  return (
    <>
      <Box
        sx={{
          background: "#ffffff",
        }}
      >
        <ViewHeader data={headerData} />

        {bookings?.map((meeting) => (
          <BookingCard key={meeting.id} data={meeting} />
        ))}
      </Box>
    </>
  );
};

export default AllBooking;