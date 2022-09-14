import { Box } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthHooks from '../../utils/hooks/useAuth';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import ViewHeader from '../ViewHeader';
import TaskCard from './TaskCard';

const AllTask = () => {
  const [tasks, setTasks] = useState();
  
  const { getUser, getToken } = useAuthHooks();
  const {callTask} = useNavbarContextHooks();
  
  const token = getToken();
  const {userid, userRole} = getUser();
  console.log("user", userid, userRole , token);

  const url = userRole === 'admin' ? `${process.env.REACT_APP_API_KEY}/task` : `${process.env.REACT_APP_API_KEY}/user/task`;

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userRole === "admin"){
        setTasks(res.data.data);
      } else {
        setTasks(res.data.data.tasks);
      }
    };
    fetchData();
  }, [token, callTask, url, userRole]);
  
  const headerData = {
    name: "All Task",
    date: "14 Aug 2023",
  };

  

  return (
    <>
      <Box
        sx={{
          background: "#ffffff",
        }}
      >
        <ViewHeader data={headerData} />
        

        {tasks?.map((task) => (
            <TaskCard key={task.id} data={task} />
          ))}
      </Box>
    </>
  );
};

export default AllTask;