import axios from "axios";
import React, { createContext, useState } from "react";
import useAuthHooks from "../hooks/useAuth";

export const NavContext = createContext();

const NavbarContextProvider = ({ children }) => {

  const { getToken} = useAuthHooks();
  const token = getToken();
  
  const [showSideBar, setShowSideBar] = useState(true);
  const [showProject, setShowProject] = useState(true);

  //add project modal
  const [openAddProject, setOpenAddProject] = React.useState(false);
  //add task modal
  const [openAddTask, setOpenAddTask] = React.useState(false);
  //add task modal
  const [openEditTask, setOpenEditTask] = React.useState(false);
  const [projectId, setProjectId] = React.useState();
  const [statusId, setStatusId] = React.useState();
  // edit task id
  const [taskId, setEditTaskId] = useState();

  // notification show
  const [showNotification, setShowNotification] = React.useState({ status : false , message: ''});

  //api call again
  const [callProject, setCallProject] = useState(false);
  const [callTask, setCallTask] = useState(false);

  const getStatusId = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/project/${id}`);
    const statusID = res.data.data.projectStatuses[0].id;
    return statusID;
  };

  const taskStatusChange = async (taskId, statusId) => {
    
    const data = { statusId: statusId };

    const res = await axios.put(
      `${process.env.REACT_APP_API_KEY}/task/changeStatus/${taskId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      console.log(res.data);

    if(res.data.status){
      console.log(res.data);
      setCallProject((prevState) => !prevState);
      setCallTask((prevState) => !prevState);
    }
    console.log(taskId, statusId);
  };

  return (
    <NavContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        showProject,
        setShowProject,
        openAddProject,
        setOpenAddProject,
        openAddTask,
        setOpenAddTask,
        getStatusId,
        callProject,
        setCallProject,
        callTask,
        setCallTask,
        openEditTask,
        setOpenEditTask,
        taskId,
        setEditTaskId,
        showNotification,
        setShowNotification,
        projectId,
        setProjectId,
        statusId,
        setStatusId,
        taskStatusChange,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavbarContextProvider;
