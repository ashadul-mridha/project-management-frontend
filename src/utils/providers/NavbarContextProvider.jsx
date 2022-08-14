import React, { createContext, useState } from "react";

export const NavContext = createContext();

const NavbarContextProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showProject, setShowProject] = useState(true);

  //add project modal
  const [openAddProject, setOpenAddProject] = React.useState(false);
  //add task modal
  const [openAddTask, setOpenAddTask] = React.useState(false);

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
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavbarContextProvider;
