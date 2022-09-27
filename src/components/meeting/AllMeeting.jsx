import { Box } from '@mui/material';
import React from 'react';
import ViewHeader from '../ViewHeader';
import MeetingCard from './MeetingCard';

const data = [1, 2,3, 4, 5, 6,7,8,9,10];


  const headerData = {
    name: "All Meeting",
  };

const AllMeeting = () => {
    return (
      <>
        <Box
          sx={{
            background: "#ffffff",
          }}
        >
          <ViewHeader data={headerData} />

          {data?.map((meeting) => (
            <MeetingCard key={meeting} data={meeting} />
          ))}
        </Box>
      </>
    );
};

export default AllMeeting;