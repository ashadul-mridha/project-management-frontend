import React, { useEffect, useState } from 'react';
import ViewHeader from '../ViewHeader';
import TaskCard from './TaskCard';
import { Box } from "@mui/material";
import axios from 'axios';

const AllTask = () => {
  const [tasks, setTasks] = useState();

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/task`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
        },
      });
      setTasks(res.data);
    };
    fetchData();
  }, []);
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