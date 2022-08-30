import React, { useEffect, useState } from 'react';
import ViewHeader from '../ViewHeader';
import TaskCard from './TaskCard';
import { Box } from "@mui/material";
import axios from 'axios';
import useAuthHooks from '../../utils/hooks/useAuth';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';

const AllTask = () => {
  const [tasks, setTasks] = useState();
  
  const { getToken } = useAuthHooks();
  const {callTask} = useNavbarContextHooks();
  
  const getTokenStr = getToken();
  const token = getTokenStr || "klsdfklsd232";

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    };
    fetchData();
  }, [token, callTask]);
  
  const headerData = {
    title: "All Task",
    date: "14 Aug 2023",
  };
  

  return (
    <>
        <Box
          sx={{
            // overflowY: "scroll",
            // maxHeight: "100vh",
            // height: "100vh",
            background: "#ffffff",
          }}
        >
          <ViewHeader data={headerData} />
          {tasks?.data.map((task) => (
            <TaskCard key={task.id} data={task} />
          ))}
        </Box>
    </>
  );
};

export default AllTask;