import { Box } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import useAuthHooks from '../../utils/hooks/useAuth';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import ViewHeader from '../ViewHeader';
import MeetingCard from './MeetingCard';


  const headerData = {
    name: "All Meeting",
  };

const AllMeeting = () => {

  const [meetings , setMeetings] = useState([]);
   const { getUser, getToken } = useAuthHooks();
   const { callMeeting } = useNavbarContextHooks();

   // get login user role
   const { userRole } = getUser();
   const token = getToken();

  /* data fetch url. */
  const url = `${process.env.REACT_APP_API_KEY}/meeting`;

  /* Fetching data from the server. */
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeetings(res.data.data);
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

        {meetings?.map((meeting) => (
          <MeetingCard key={meeting.id} data={meeting} />
        ))}
      </Box>
    </>
  );
};

export default AllMeeting;