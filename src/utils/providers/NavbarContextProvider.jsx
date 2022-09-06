import axios from "axios";
import React, { createContext, useState } from "react";

export const NavContext = createContext();

const NavbarContextProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showProject, setShowProject] = useState(true);

  //add project modal
  const [openAddProject, setOpenAddProject] = React.useState(false);
  //add task modal
  const [openAddTask, setOpenAddTask] = React.useState(false);
  //add task modal
  const [openEditTask, setOpenEditTask] = React.useState(false);
  // edit task id
  const [taskId, setEditTaskId] = useState();

  // notification show
  const [showNotification, setShowNotification] = React.useState({ status : false , message: ''});

  //api call again
  const [callProject, setCallProject] = useState(false);
  const [callTask, setCallTask] = useState(false);

  const getStatusId = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/project/${id}`);
    const statusID = res.data.data.projectStatuses[0].id;
    return statusID;
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
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavbarContextProvider;
