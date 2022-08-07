import React, { createContext, useState } from "react";

export const NavContext = createContext();

const NavbarContextProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showProject, setShowProject] = useState(true);
  return (
    <NavContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        showProject,
        setShowProject,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavbarContextProvider;
