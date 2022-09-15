import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import ViewHeader from "../ViewHeader";
import TaskCard from "./TaskCard";

const TodayTask = () => {
  const [tasks, setTasks] = useState();

  const { getUser, getToken } = useAuthHooks();
  const { callTask } = useNavbarContextHooks();

  const token = getToken();
  const { userRole } = getUser();

  const url =
    userRole === "admin"
      ? `${process.env.REACT_APP_API_KEY}/task/today`
      : `${process.env.REACT_APP_API_KEY}/user/task/today`;

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userRole === "admin") {
        setTasks(res.data.data);
      } else {
        setTasks(res.data.data.tasks);
      }
    };
    fetchData();
  }, [token, callTask, url, userRole]);

  const headerData = {
    name: "Today Task",
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

export default TodayTask;
